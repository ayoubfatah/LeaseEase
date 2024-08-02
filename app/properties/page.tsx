import React from "react";
import properties from "@/properties.json";

import SearchInput from "@/components/SearchInput";
import PropertyCard from "@/components/PropertyCard";
export default function PropertiesPage() {
  return (
    <>
      <SearchInput />

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
