import React from "react";
import SearchInput from "./SearchInput";

export default function HeroSection() {
  return (
    <section className="bg-slate-800">
      <div className=" h-[450px] m-auto  gap-2 flex flex-col justify-center items-center text-white container   ">
        <h1 className="text-[30px]  md:text-[40px] lg:text-[50px] font-bold ">
          Find The Perfect Property
        </h1>
        <h3>Search for your dream home</h3>
        <SearchInput />
      </div>
    </section>
  );
}
