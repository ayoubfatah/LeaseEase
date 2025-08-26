import type { PropertyType } from "@/types/types";
import Image from "next/image";
import { FaBed, FaMoneyBill, FaRulerCombined, FaShower } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function FeaturedPropertyCard({
  property,
}: {
  property: PropertyType;
}) {
  const { name, type, location, beds, baths, square_feet, rates, images } =
    property ?? {};

  console.log(property, "property ");
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50">
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            width={500}
            height={300}
            src={images[0] || "/placeholder.svg"}
            alt={`${name} - ${type} in ${location.city}`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>

        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className="bg-white/95 backdrop-blur-sm text-primary font-bold text-lg px-4 py-2 shadow-lg border-0"
          >
            {rates.monthly
              ? `$${rates.monthly.toLocaleString()}/mo`
              : `$${rates.weekly}/wk`}
          </Badge>
        </div>

        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-3 py-1 shadow-lg border-0">
            Featured
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs font-medium">
            {type}
          </Badge>
          <h3 className="text-xl font-bold text-foreground leading-tight line-clamp-2">
            {name}
          </h3>
        </div>

        <div className="flex items-center justify-center gap-6 py-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FaBed className="text-primary" />
            <span className="font-medium">{beds}</span>
            <span className="text-sm hidden sm:inline">Beds</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <FaShower className="text-primary" />
            <span className="font-medium">{baths}</span>
            <span className="text-sm hidden sm:inline">Baths</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <FaRulerCombined className="text-primary" />
            <span className="font-medium">{square_feet}</span>
            <span className="text-sm hidden sm:inline">sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {rates.weekly && (
            <div className="flex items-center gap-1 text-sm text-green-700 bg-green-50 px-2 py-1 rounded-full">
              <FaMoneyBill className="text-xs" />
              <span className="font-medium">Weekly</span>
            </div>
          )}
          {rates.monthly && (
            <div className="flex items-center gap-1 text-sm text-green-700 bg-green-50 px-2 py-1 rounded-full">
              <FaMoneyBill className="text-xs" />
              <span className="font-medium">Monthly</span>
            </div>
          )}
          {rates.nightly && (
            <div className="flex items-center gap-1 text-sm text-green-700 bg-green-50 px-2 py-1 rounded-full">
              <FaMoneyBill className="text-xs" />
              <span className="font-medium">Nightly</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FaLocationDot className="text-orange-600 text-sm" />
            <span className="text-sm font-medium text-orange-700">
              {location.city}, {location.state}
            </span>
          </div>
          <Button
            size="sm"
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 transition-all duration-200"
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
