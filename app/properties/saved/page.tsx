"use client";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/PropertyCardsSkeleton";
import Spinner from "@/components/Spinner";
import { PropertyType } from "@/types/types";
import React, { useEffect, useState } from "react";

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedProperties() {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchSavedProperties();
  }, []);
  if (loading) return <PropertyCardSkeleton />;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties?.length === 0 ? (
          <p>No Saved properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map((prop: PropertyType) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
