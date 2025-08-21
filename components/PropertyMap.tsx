"use client";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect, useRef, useState } from "react";

const PropertyMap: React.FC<any> = ({ property }: any) => {
  const address = [
    property?.location?.street,
    property?.location?.city,
    property?.location?.state,
    property?.location?.zipcode,
  ]
    .filter(Boolean)
    .join(", ");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null); // State to track any errors
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (!address || address.trim().length === 0) {
          throw new Error("Address is missing or incomplete");
        }
        const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
        if (!apiKey) {
          throw new Error(
            "Missing NEXT_PUBLIC_OPENCAGE_API_KEY. Add it to .env.local and restart the dev server."
          );
        }
        // Fetch coordinates from the OpenCage API
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          let details = response.statusText || "";
          try {
            const errJson = await response.json();
            if (errJson?.status?.message) {
              details = `${errJson.status.code} ${errJson.status.message}`;
            }
          } catch {}
          throw new Error(`Error fetching data: ${response.status} ${details}`);
        }

        const data = await response.json();

        if (data.results.length === 0) {
          throw new Error("No results found for the given address");
        }

        const { lat, lng } = data.results[0].geometry;
        setLocation({ lat, lng });
      } catch (err: any) {
        setError(err.message); // Capture any error messages
      }
    };

    fetchCoordinates();
  }, [address]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (location) {
      try {
        // Re-center if map already exists
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setCenter([location.lng, location.lat]);
        } else {
          const map = new maplibregl.Map({
            container: mapRef.current,
            style:
              "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
            center: [location.lng, location.lat],
            zoom: 13,
          });
          mapInstanceRef.current = map;
          new maplibregl.Marker()
            .setLngLat([location.lng, location.lat])
            .addTo(map);
        }
      } catch (err: any) {
        console.error("Error initializing the map:", err.message);
      }
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location]);

  if (error) {
    return <div>Error: {error}</div>; // Display any errors to the user
  }

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default PropertyMap;
