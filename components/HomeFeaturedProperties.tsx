"use client";

import { PropertyType } from "@/types/types";
import { useEffect, useState } from "react";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import PropertyCardSkeleton from "./PropertyCardsSkeleton";

export default function HomeFeaturedProperties() {
  const [featuredProperties, setFeaturedProperties] = useState<PropertyType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const featured =
          data?.properties
            ?.filter((p: PropertyType) => p.is_featured)
            ?.slice(0, 3) || [];

        setFeaturedProperties(featured);
      } catch (error) {
        console.log("Failed to fetch featured properties:", error);
        setFeaturedProperties([]);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-6 bg-slate-100">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>

          <PropertyCardSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6 bg-slate-100">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProperties.map((prop) => (
            <FeaturedPropertyCard key={prop.name} property={prop} />
          ))}
        </div>
      </div>
    </section>
  );
}
