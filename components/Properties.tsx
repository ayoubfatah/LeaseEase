"use client";
import { PropertyType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

// Separate the fetch function for cleaner code
const fetchProperties = async (page: number, pageSize: number) => {
  const response = await fetch(
    `/api/properties?page=${page}&pageSize=${pageSize}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
};

export default function Properties() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["properties", page, pageSize],
    queryFn: () => fetchProperties(page, pageSize),
    enabled: typeof window !== "undefined", // only run on client
  });

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const properties = data?.properties || [];
  const totalItems = data?.total || 0;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((prop: PropertyType) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
