"use client";
import type { PropertyType } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBed, FaMoneyBill, FaRulerCombined, FaShower } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PropertyCard({ property }: { property: PropertyType }) {
  const router = useRouter();

  const {
    _id,
    name,
    type,
    description,
    location,
    beds,
    baths,
    square_feet,
    rates,
    images,
    is_featured,
  } = property ?? {};

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            quality={75}
            width={500}
            height={375}
            src={property.images[0] || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <Badge
          variant="secondary"
          className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-primary font-semibold px-3 py-1.5 shadow-lg border-0"
        >
          {rates.monthly
            ? `$${rates.monthly.toLocaleString()}/mo`
            : rates.weekly
            ? `$${rates.weekly.toLocaleString()}/wk`
            : rates.nightly
            ? `$${rates.nightly.toLocaleString()}/night`
            : "Contact for rates"}
        </Badge>

        {is_featured && (
          <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600 text-white font-medium">
            Featured
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <Badge variant="outline" className="mb-2 text-xs font-medium">
            {type}
          </Badge>
          <h3 className="text-xl font-semibold text-foreground line-clamp-2 leading-tight">
            {name}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <FaBed className="w-4 h-4" />
            <span className="text-sm font-medium">{beds}</span>
            <span className="text-xs hidden sm:inline">beds</span>
          </div>
          <div className="flex items-center gap-1">
            <FaShower className="w-4 h-4" />
            <span className="text-sm font-medium">{baths}</span>
            <span className="text-xs hidden sm:inline">baths</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="w-4 h-4" />
            <span className="text-sm font-medium">
              {square_feet?.toLocaleString()}
            </span>
            <span className="text-xs hidden sm:inline">sqft</span>
          </div>
        </div>

        {(rates.weekly || rates.monthly || rates.nightly) && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-muted-foreground font-medium">
              Available:
            </span>
            <div className="flex gap-2">
              {rates.weekly && (
                <Badge variant="outline" className="text-xs">
                  <FaMoneyBill className="w-3 h-3 mr-1" />
                  Weekly
                </Badge>
              )}
              {rates.monthly && (
                <Badge variant="outline" className="text-xs">
                  <FaMoneyBill className="w-3 h-3 mr-1" />
                  Monthly
                </Badge>
              )}
              {rates.nightly && (
                <Badge variant="outline" className="text-xs">
                  <FaMoneyBill className="w-3 h-3 mr-1" />
                  Nightly
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="border-t border-border mb-4"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FaLocationDot className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">
              {location.city}, {location.state}
            </span>
          </div>
          <Button
            onClick={() => router.push(`/properties/${_id}`)}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
