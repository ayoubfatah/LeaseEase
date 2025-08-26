"use client";

import ProfileUserInfo from "@/components/ProfileuserInfo";
import Spinner from "@/components/Spinner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MapPin, Edit, Trash2, Bed, Bath, Square } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
        toast.success("Property deleted successfully");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("Failed to delete property");

      console.log(error);
    }
  }
  if (loading)
    return (
      <section className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-8 px-4">
          <Card className="mb-8">
            <CardContent className="p-6 space-y-6">
              {/* Profile Title */}
              <Skeleton className="h-8 w-48" />

              {/* User Info section (simulate avatar + fields) */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              {/* Your Listings header + badge */}
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              {/* Property grid skeletons */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-5 w-24" />
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
            <ProfileUserInfo />

            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Listings</h2>
                <Badge variant="secondary" className="text-sm">
                  {properties.length}{" "}
                  {properties.length === 1 ? "Property" : "Properties"}
                </Badge>
              </div>

              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Square className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No properties yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start by adding your first property listing
                  </p>
                  <Button asChild>
                    <Link href="/properties/add">Add Property</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {properties.map((property: any) => (
                    <Card
                      key={property._id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <Link href={`/properties/${property._id}`}>
                          <Image
                            width={400}
                            height={250}
                            className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
                            src={
                              property?.images?.[0] ||
                              "/placeholder.svg?height=250&width=400"
                            }
                            alt={property?.name || "Property"}
                          />
                        </Link>
                        {property?.type && (
                          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 hover:bg-white">
                            {property.type}
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {property?.name}
                            </h3>
                            <div className="flex items-center text-gray-600 text-sm mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="line-clamp-1">
                                {property?.location?.street || property?.street}
                                , {property?.location?.city || "Unknown City"}
                              </span>
                            </div>
                          </div>

                          {(property?.beds ||
                            property?.baths ||
                            property?.square_feet) && (
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              {property?.beds && (
                                <div className="flex items-center gap-1">
                                  <Bed className="w-4 h-4" />
                                  <span>{property.beds}</span>
                                </div>
                              )}
                              {property?.baths && (
                                <div className="flex items-center gap-1">
                                  <Bath className="w-4 h-4" />
                                  <span>{property.baths}</span>
                                </div>
                              )}
                              {property?.square_feet && (
                                <div className="flex items-center gap-1">
                                  <Square className="w-4 h-4" />
                                  <span>{property.square_feet} sq ft</span>
                                </div>
                              )}
                            </div>
                          )}

                          {property?.rates && (
                            <div className="text-sm">
                              {property.rates.monthly && (
                                <p className="font-semibold text-green-600">
                                  ${property.rates.monthly}/month
                                </p>
                              )}
                              {!property.rates.monthly &&
                                property.rates.weekly && (
                                  <p className="font-semibold text-green-600">
                                    ${property.rates.weekly}/week
                                  </p>
                                )}
                              {!property.rates.monthly &&
                                !property.rates.weekly &&
                                property.rates.nightly && (
                                  <p className="font-semibold text-green-600">
                                    ${property.rates.nightly}/night
                                  </p>
                                )}
                            </div>
                          )}

                          <div className="flex gap-2 pt-2">
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent"
                            >
                              <Link href={`/properties/${property._id}/edit`}>
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                            <Button
                              onClick={() => handleDelete(property._id)}
                              variant="destructive"
                              size="sm"
                              className="flex-1"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
