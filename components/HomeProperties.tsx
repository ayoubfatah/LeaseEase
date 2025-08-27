"use client";

import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { PropertyType } from "@/types/types";
import Link from "next/link";
import PropertyCardSkeleton from "./PropertyCardsSkeleton";

export default function HomeProperties() {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const sliced = data?.properties?.slice(0, 3) ?? [];
        setProperties(sliced);
      } catch (error) {
        console.log("Failed to fetch properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <PropertyCardSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((prop: PropertyType) => (
            <PropertyCard key={prop.name} property={prop} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href={"/properties"}
          className="bg-slate-900 py-3 flex justify-center border border-slate-900 hover:text-black hover:bg-white transition-all ease-in-out duration-500 w-[300px] mt-5 rounded-lg text-white"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
