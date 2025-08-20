"use client";

import PropertyCard from "@/components/PropertyCard";
import SearchInput from "@/components/SearchInput";
import Spinner from "@/components/Spinner";
import { PropertyType } from "@/types/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  const fetchProperties = useCallback(async () => {
    const res = await fetch(
      `/api/properties/search?location=${location}&propertyType=${propertyType}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  }, [location, propertyType]);

  const {
    data: properties,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["properties", location, propertyType],
    queryFn: fetchProperties,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <>
      <SearchInput />
      <section className="px-4 py-6 h-lvh">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2" /> Back to Properties
          </Link>
          <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
          {properties && properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties?.map((prop: PropertyType) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
