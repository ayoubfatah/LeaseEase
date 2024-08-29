import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { PropertyType } from "@/types/types";

const PropertyMap: React.FC<any> = ({ property }: any) => {
  const address = `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`;
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null); // State to track any errors

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Fetch coordinates from the OpenCage API
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            address
          )}&key=e490c575fb7a4587b3d19fa2141a47ec`
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
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
    if (location) {
      try {
        const map = new maplibregl.Map({
          container: "map",
          style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
          center: [location.lng, location.lat],
          zoom: 13,
        });

        new maplibregl.Marker()
          .setLngLat([location.lng, location.lat])
          .addTo(map);
      } catch (err: any) {
        console.error("Error initializing the map:", err.message); // Log any map initialization errors
      }
    }
  }, [location]);

  if (error) {
    return <div>Error: {error}</div>; // Display any errors to the user
  }

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default PropertyMap;
