"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchProperty } from "@/utils/request";
export default function page() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) {
        return;
      }
      try {
        const data = await fetchProperty(id as string);
        setProperty(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (!property) {
      fetchPropertyData();
    }
  }, [id, property]);
  console.log(property);
  return <div>page</div>;
}
