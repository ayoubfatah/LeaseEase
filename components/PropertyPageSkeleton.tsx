import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function PropertyPageSkeleton() {
  return (
    <>
      {/* Header Section Skeleton */}
      <section className="h-full">
        <div className="relative">
          {/* Hero Image Skeleton */}
          <div className="relative h-[500px] w-full overflow-hidden">
            <Skeleton className="w-full h-full" />

            {/* Property Type Badge Skeleton */}
            <div className="absolute top-6 left-6">
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>

            {/* Property Info Overlay Skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="container mx-auto">
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Property Details Skeleton */}
                    <div className="flex-1">
                      <Skeleton className="h-8 w-3/4 mb-2" />
                      <div className="flex items-center mb-3">
                        <Skeleton className="h-4 w-4 mr-2 rounded" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <div className="flex items-center gap-6">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>

                    {/* Owner Info Skeleton */}
                    <div className="flex items-center gap-4 md:flex-col md:items-end">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div>
                          <Skeleton className="h-3 w-20 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>

      {/* Main Content Section Skeleton */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* Property Details Skeleton */}
            <main>
              {/* Basic Info Card Skeleton */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="flex align-middle justify-center md:justify-start mb-4">
                  <Skeleton className="h-4 w-4 mr-2 rounded" />
                  <Skeleton className="h-4 w-1/2" />
                </div>

                <Skeleton className="h-8 w-full mb-6" />
                <div className="flex flex-col md:flex-row justify-around">
                  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                    <Skeleton className="h-4 w-16 mr-2" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                  <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                    <Skeleton className="h-4 w-16 mr-2" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                  <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                    <Skeleton className="h-4 w-16 mr-2" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>

              {/* Description Card Skeleton */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="flex justify-center gap-4 mb-4 text-xl space-x-9">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              {/* Amenities Card Skeleton */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <Skeleton className="h-6 w-32 mb-6" />
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index} className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2 rounded" />
                      <Skeleton className="h-4 w-24" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map Card Skeleton */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <Skeleton className="h-64 w-full rounded" />
              </div>
            </main>

            {/* Sidebar Skeleton */}
            <aside className="space-y-4">
              {/* Bookmark Button Skeleton */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Skeleton className="h-12 w-full" />
              </div>

              {/* Share Button Skeleton */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Skeleton className="h-12 w-full" />
              </div>

              {/* Contact Form Skeleton */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Property Images Section Skeleton */}
      <section className="bg-slate-100 p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative h-[400px] rounded-xl overflow-hidden"
              >
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
