import React, { useState, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { PropertyType } from "@/types/types";

const PropertyMap: React.FC<any> = ({ property }: any) => {
  const address = `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`;
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=e490c575fb7a4587b3d19fa2141a47ec`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLocation({ lat, lng });
      }
    };

    fetchCoordinates();
  }, [address]);

  useEffect(() => {
    if (location) {
      const map = new maplibregl.Map({
        container: "map",
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        center: [location.lng, location.lat],
        zoom: 13,
      });
      console.log(location);
      console.log(location.lat, location.lng);

      new maplibregl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(map);
    }
  }, [location]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default PropertyMap;
