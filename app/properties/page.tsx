import React from "react";

import SearchInput from "@/components/SearchInput";
import PropertyCard from "@/components/PropertyCard";
import { PropertyType } from "@/types/types";
import { fetchProperties, fetchProperty } from "@/utils/request";

export const metadata = {
  title: "LeaseEase | Properties",
};

export default async function PropertiesPage() {
  const properties = await fetchProperties();
  // sort by date

  const sortedProperties = properties?.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <SearchInput />
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {sortedProperties?.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties?.map((prop: PropertyType) => (
                <PropertyCard key={prop.name} property={prop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
