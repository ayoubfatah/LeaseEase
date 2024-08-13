"use client";
import ProfileUserInfo from "@/components/ProfileuserInfo";
import { PropertyType } from "@/types/types";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function page() {
  const { data: session } = useSession();
  const userId = session && session?.user ? session.user?.id : null;
  console.log(userId);
  console.log(session);
  const [properties, setProperties] = useState<PropertyType[]>([]);
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

    if (userId) {
      fetchProperties(userId);
    }
  }, [userId]);
  console.log(properties);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <ProfileUserInfo />

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <div className="mb-10">
                <a href="/property.html">
                  <img
                    className="h-32 w-full rounded-md object-cover"
                    src="/images/properties/a1.jpg"
                    alt="Property 1"
                  />
                </a>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Property Title 1</p>
                  <p className="text-gray-600">Address: 123 Main St</p>
                </div>
                <div className="mt-2">
                  <a
                    href="/add-property.html"
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mb-10">
                <a href="/property.html">
                  <img
                    className="h-32 w-full rounded-md object-cover"
                    src="/images/properties/b1.jpg"
                    alt="Property 2"
                  />
                </a>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Property Title 2</p>
                  <p className="text-gray-600">Address: 456 Elm St</p>
                </div>
                <div className="mt-2">
                  <a
                    href="/add-property.html"
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
