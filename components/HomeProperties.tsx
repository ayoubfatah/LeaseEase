"use client";
import React from "react";
import PropertyCard from "./PropertyCard";
import { PropertyType } from "@/types/types";
import properties from "@/properties.json";
import { useRouter } from "next/router";
import Link from "next/link";

export default function HomeProperties() {
  const slicedProperties = properties?.slice(0, 3) ?? [];

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slicedProperties.map((prop) => (
            <PropertyCard key={prop._id} property={prop} />
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