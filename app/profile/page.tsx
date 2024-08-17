"use client";

import ProfileUserInfo from "@/components/ProfileuserInfo";
import Spinner from "@/components/Spinner";
import { PropertyType } from "@/types/types";
import { authOptions } from "@/utils/authOptions";
import { getServerSession, Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DELETE } from "../api/properties/[id]/route";

export default function Page() {
  const { data: session }: { data: Session | any } = useSession();

  console.log(session);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProperties = async (userId: string) => {
      if (!userId) return;
      try {
        const response = await fetch(`/api/properties/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchProperties(session?.user?.id);
    }
  }, [session?.user?.id]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "are you sure you wanna delete this property"
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.status === 200) {
        // remove the property from state
        const updatedProperties = properties.filter((prop) => prop._id !== id);

        setProperties(updatedProperties);
        alert("property deleted");
      } else {
        alert("failed to delete property ");
      }
    } catch (error) {
      alert("failed to delete property ");

      console.log(error);
    }
  }
  if (loading) return <Spinner />;
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <ProfileUserInfo />

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {properties.map((property: any) => (
                <div key={property.id} className="mb-10">
                  <Link href={`/properties/${property._id}`}>
                    <Image
                      width={500}
                      height={500}
                      className="h-32 w-full rounded-md object-cover"
                      src={property?.images?.[0]}
                      alt="Property 1"
                    />
                  </Link>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">{property?.name}</p>
                    <p className="text-gray-600">
                      Address: {property?.street}{" "}
                    </p>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`/properties/${property._id}/edit`}
                      className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
