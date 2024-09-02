"use client";
import PropertyCard from "@/components/PropertyCard";
import SearchInput from "@/components/SearchInput";
import Spinner from "@/components/Spinner";
import { PropertyType } from "@/types/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
  console.log(location, propertyType);

  useEffect(() => {
    async function getProperties() {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.status == 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getProperties();
  }, [location, propertyType]);
  console.log(properties, "testing");
  if (loading) <Spinner />;
  return (
    <>
      {/* <SearchInput /> */}
      <SearchInput />
      <section className="px-4 py-6 h-lvh">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex   items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 " /> Back to Properties{" "}
          </Link>
          <h1 className="text-2xl font-semibold mb-4">Search Results </h1>
          {properties.length === 0 ? (
            <div>
              {" "}
              <p>No search results found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((prop: PropertyType) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
