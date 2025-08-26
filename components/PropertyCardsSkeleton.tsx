"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyCardSkeleton() {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <Card
              key={idx}
              className="overflow-hidden shadow-md border-0 animate-pulse"
            >
              <div className="aspect-[4/3] bg-muted" />
              <CardContent className="p-6 space-y-4">
                <Skeleton className="w-24 h-5 rounded" />
                <Skeleton className="w-full h-6 rounded" />
                <div className="flex gap-4">
                  <Skeleton className="w-10 h-4 rounded" />
                  <Skeleton className="w-10 h-4 rounded" />
                  <Skeleton className="w-10 h-4 rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="w-24 h-4 rounded" />
                  <Skeleton className="w-20 h-8 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
