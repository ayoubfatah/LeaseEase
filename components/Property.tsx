import { PropertyType } from "@/types/types";
import Image from "next/image";
import React from "react";
import { FaBed, FaMoneyBill, FaRulerCombined, FaShower } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function Property({ property }: { property: PropertyType }) {
  console.log(property);
  const {
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
  } = property;

  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        width={500}
        height={300}
        src={`/images/properties/${images[0]}`}
        alt=""
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{type}</div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {rates.monthly ? "$" + rates.monthly : "$" + rates.weekly}{" "}
          {rates.monthly ? "/mo" : "/wk"}
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
          <p>
            <FaMoneyBill />
            Weekly
          </p>
          <p>
            <FaMoneyBill />
            Monthly
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaLocationDot className=" text-lg text-orange-700" />
            <span className="text-orange-700"> {location.city} </span>
          </div>
          <button className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
