"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProperty } from "@/utils/request";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import type { PropertyType } from "@/types/types";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import SharePropertyButton from "@/components/SharePropertyButton";
import ContactForm from "@/components/ContactForm";

export default function PropertyPage() {
  const { id } = useParams();

  const {
    data: property,
    isLoading,
    error,
  } = useQuery<PropertyType>({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id as string),
    enabled: !!id,
  });

  if (isLoading) return <Spinner />;

  if (error) return <div>Error loading property</div>;

  if (!property) return null;

  return (
    <>
      <section className="h-full">
        <PropertyHeaderImage image={property.images[0]} property={property} />
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
  );
}
