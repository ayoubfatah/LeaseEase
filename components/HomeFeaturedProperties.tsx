import React from "react";
import PropertyCard from "./PropertyCard";
import { PropertyType } from "@/types/types";
import properties from "@/properties.json";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

export default function HomeFeaturedProperties() {
  const featuredProperties: PropertyType[] =
    properties.filter((prop) => prop.is_featured === true).slice(0, 3) ?? [];
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
