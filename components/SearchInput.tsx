import React from "react";

export default function SearchInput() {
  return (
    <div className="bg-slate-800 h-[130px] flex justify-center items-center w-full">
      <form className="flex  flex-col  justify-center  lg:flex-row gap-2 w-[45%] text-black ">
        <input
          placeholder="Enter Location (Region ,City or Zip)"
          className="lg:w-1/2  py-1.5 md:py-2.5 px-2 rounded-lg"
          type="text"
        />
        <select
          className="  py-1.5 md:py-2.5   lg:w-1/3 rounded-lg px-2"
          name="property-type"
          id="property-type"
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
        <button className="bg-gray-50 px-5  py-1.5 md:py-2.5   hover:bg-gray-900 hover:text-white  duration-300 ease transition-all rounded-lg">
          Search
        </button>
      </form>
    </div>
  );
}