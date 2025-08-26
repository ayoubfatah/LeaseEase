import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, User, Star } from "lucide-react";

const PropertyHeaderImage = ({
  image,
  property,
}: {
  image: any;
  property: any;
}) => {
  return (
    <section className="relative">
      {/* Hero Image with Overlay */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={property?.name || "Property"}
          className="object-cover w-full h-full"
          width={0}
          height={0}
          sizes="100vw"
          priority={true}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Property Type Badge */}
        <div className="absolute top-6 left-6">
          <Badge
            variant="secondary"
            className="bg-white/90 text-gray-900 font-semibold px-3 py-1"
          >
            {property?.type}
          </Badge>
        </div>

        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Property Details */}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {property?.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                    <span className="text-sm md:text-base">
                      {property?.location?.street}, {property?.location?.city},{" "}
                      {property?.location?.state}
                    </span>
                  </div>

                  {/* Property Stats */}
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <strong>{property?.beds}</strong> beds
                    </span>
                    <span className="flex items-center gap-1">
                      <strong>{property?.baths}</strong> baths
                    </span>
                    <span className="flex items-center gap-1">
                      <strong>{property?.square_feet?.toLocaleString()}</strong>{" "}
                      sqft
                    </span>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="self-end">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Property Owner
                      </p>
                      <p className="font-semibold text-gray-900">
                        {property?.seller_info?.name || "Owner Name"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
