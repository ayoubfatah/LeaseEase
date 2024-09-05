import React from "react";
import properties from "@/properties.json";

import SearchInput from "@/components/SearchInput";
import { PropertyType } from "@/types/types";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/request";
import Properties from "@/components/Properties";

export default async function PropertiesPage() {

  return (
    <>
      <SearchInput />
      <Properties />
    </>
  );
}
