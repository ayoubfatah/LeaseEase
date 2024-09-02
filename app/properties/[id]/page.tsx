"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchProperty } from "@/utils/request";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { PropertyType } from "@/types/types";
import PropertyDetails from "@/components/PropertyDetails";
import SearchInput from "@/components/SearchInput";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";

import BookmarkButton from "@/components/BookmarkButton";
import SharePropertyButton from "@/components/SharePropertyButton";
import ContactForm from "@/components/ContactForm";
export default function page() {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) {
        return;
      }
      try {
        const data = await fetchProperty(id as string);
        setProperty(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (!property) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (loading) {
    <Spinner />;
  }

  return (
    <>
      {!loading && property && (
        <>
          <section>
            {/* <SearchInput /> */}
            <PropertyHeaderImage image={property?.images[0]} />
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                {property && <PropertyDetails property={property} />}
                <aside className=" space-y-4 ">
                  <BookmarkButton property={property} />
                  <SharePropertyButton property={property} />
                  <ContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>

          <PropertyImages images={property?.images} />
        </>
      )}
    </>
  );
}
