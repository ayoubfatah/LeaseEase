"use client";
import { PropertyType } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaBed, FaMoneyBill, FaRulerCombined, FaShower } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function PropertyCard({ property }: { property: PropertyType }) {
  const router = useRouter();

  const {
    _id,
    name,
    type,
    description,
    location,
    beds,
    baths,
    square_feet,
    rates,
    images,
    is_featured,
  } = property ?? {};

  return (
    <div className="rounded-xl shadow-md relative  ">
      <div className="overflow-hidden h-[220px]">
        <Image
          quality={10}
          width={500}
          height={300}
          src={property.images[0]}
          alt=""
          className="w-full h-auto rounded-t-xl hover:scale-105 transition-all duration-500 "
        />
      </div>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{type}</div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {rates.monthly
            ? "$" + rates?.monthly.toLocaleString()
            : "$" + rates.weekly}{" "}
          {rates.monthly?.toLocaleString() ? "/mo" : "/wk"}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed /> {beds}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaShower /> {baths}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <i className="fa-solid fa-ruler-combined"></i>
            <FaRulerCombined />
            {square_feet} <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {rates.weekly && (
            <p>
              <FaMoneyBill />
              Weekly
            </p>
          )}
          {rates.monthly && (
            <p>
              <FaMoneyBill />
              Monthly
            </p>
          )}
          {rates.nightly && (
            <p>
              <FaMoneyBill />
              Nightly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaLocationDot className=" text-lg text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {location.city}, {location.state}
            </span>
          </div>
          <button
            onClick={() => router.push(`/properties/${_id}`)}
            className="h-[36px] bg-slate-800  border-slate-900 border ease-linear      text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
