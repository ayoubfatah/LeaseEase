"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchProperty } from "@/utils/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { MapPin, Home, DollarSign, User, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema aligned with add form
const propertySchema = z.object({
  name: z.string().min(1, "Property name is required"),
  type: z.string().min(1, "Property type is required"),
  description: z.string().optional(),
  location: z.object({
    street: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipcode: z.string().optional(),
  }),
  beds: z.number().min(0, "Bedrooms must be 0 or greater"),
  baths: z.number().min(0, "Bathrooms must be 0 or greater"),
  square_feet: z.number().min(1, "Square feet must be greater than 0"),
  amenities: z.array(z.string()).default([]),
  rates: z.object({
    nightly: z.number().min(0).optional().nullable(),
    weekly: z.number().min(0).optional().nullable(),
    monthly: z.number().min(0).optional().nullable(),
  }),
  seller_info: z.object({
    name: z.string().min(1, "Contact name is required"),
    email: z.string().email("Valid email address is required"),
    phone: z.string().optional(),
  }),
});

type PropertyFormData = z.input<typeof propertySchema>;

const PropertyEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      type: "Apartment",
      name: "",
      description: "",
      location: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
      },
      beds: 0,
      baths: 0,
      square_feet: 0,
      amenities: [],
      rates: {
        nightly: null,
        weekly: null,
        monthly: null,
      },
      seller_info: {
        name: "",
        email: "",
        phone: "",
      },
    },
  });

  const watchedAmenities = watch("amenities");

  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) return;
      try {
        const data = await fetchProperty(id as string);
        const normalized: PropertyFormData = {
          type: data.type || "Apartment",
          name: data.name || "",
          description: data.description || "",
          location: {
            street: data.location?.street || "",
            city: data.location?.city || "",
            state: data.location?.state || "",
            zipcode: data.location?.zipcode || "",
          },
          beds: Number(data.beds ?? 0),
          baths: Number(data.baths ?? 0),
          square_feet: Number(data.square_feet ?? 0),
          amenities: Array.isArray(data.amenities) ? data.amenities : [],
          rates: {
            nightly: data.rates?.nightly ?? null,
            weekly: data.rates?.weekly ?? null,
            monthly: data.rates?.monthly ?? null,
          },
          seller_info: {
            name: data.seller_info?.name || "",
            email: data.seller_info?.email || "",
            phone: data.seller_info?.phone || "",
          },
        };
        reset(normalized);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPropertyData();
  }, [id, reset]);

  const handleAmenitiesChange = (amenity: string, checked: boolean) => {
    const currentAmenities = watchedAmenities || [];
    if (checked) {
      setValue("amenities", [...currentAmenities, amenity]);
    } else {
      setValue(
        "amenities",
        currentAmenities.filter((a) => a !== amenity)
      );
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("type", data.type);
      if (data.description) formData.append("description", data.description);

      if (data.location.street)
        formData.append("location.street", data.location.street);
      formData.append("location.city", data.location.city);
      formData.append("location.state", data.location.state);
      if (data.location.zipcode)
        formData.append("location.zipcode", data.location.zipcode);

      formData.append("beds", data.beds.toString());
      formData.append("baths", data.baths.toString());
      formData.append("square_feet", data.square_feet.toString());

      (data.amenities ?? []).forEach((amenity) => {
        formData.append("amenities", amenity);
      });

      if (data.rates.nightly)
        formData.append("rates.nightly", data.rates.nightly.toString());
      if (data.rates.weekly)
        formData.append("rates.weekly", data.rates.weekly.toString());
      if (data.rates.monthly)
        formData.append("rates.monthly", data.rates.monthly.toString());

      formData.append("seller_info.name", data.seller_info.name);
      formData.append("seller_info.email", data.seller_info.email);
      if (data.seller_info.phone)
        formData.append("seller_info.phone", data.seller_info.phone);

      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        toast.success("Property updated successfully");
        router.push(`/properties/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      } else if (res.status === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Failed to update property");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-muted-foreground">Loading property...</span>
        </div>
      </div>
    );
  }

  const amenitiesList = [
    "Wifi",
    "Full kitchen",
    "Washer & Dryer",
    "Free Parking",
    "Swimming Pool",
    "Hot Tub",
    "24/7 Security",
    "Wheelchair Accessible",
    "Elevator Access",
    "Dishwasher",
    "Gym/Fitness Center",
    "Air Conditioning",
    "Balcony/Patio",
    "Smart TV",
    "Coffee Maker",
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Edit Property
        </h1>
        <p className="text-muted-foreground">
          Update your property listing details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-4">
            <Home className="h-5 w-5 mr-2 text-primary" />
            <div>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>
                Basic information about your property
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">
                  Property Type <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="CabinOrCottage">
                          Cabin or Cottage
                        </SelectItem>
                        <SelectItem value="Room">Room</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  Listing Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="e.g. Beautiful Apartment In Miami"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Add an optional description of your property"
                {...register("description")}
                className="resize-none"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-4">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            <div>
              <CardTitle>Location</CardTitle>
              <CardDescription>Where is your property located?</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  {...register("location.street")}
                  placeholder="123 Main Street"
                />
                {errors.location?.street && (
                  <p className="text-sm text-red-500">
                    {errors.location.street.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  {...register("location.city")}
                  placeholder="Miami"
                />
                {errors.location?.city && (
                  <p className="text-sm text-red-500">
                    {errors.location.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="state"
                  {...register("location.state")}
                  placeholder="FL"
                />
                {errors.location?.state && (
                  <p className="text-sm text-red-500">
                    {errors.location.state.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                  id="zipcode"
                  {...register("location.zipcode")}
                  placeholder="33101"
                />
                {errors.location?.zipcode && (
                  <p className="text-sm text-red-500">
                    {errors.location.zipcode.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Specifications</CardTitle>
            <CardDescription>Size and layout details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="beds">
                  Bedrooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="beds"
                  type="number"
                  min="0"
                  {...register("beds", { valueAsNumber: true })}
                />
                {errors.beds && (
                  <p className="text-sm text-red-500">{errors.beds.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="baths">
                  Bathrooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="baths"
                  type="number"
                  min="0"
                  step="0.5"
                  {...register("baths", { valueAsNumber: true })}
                />
                {errors.baths && (
                  <p className="text-sm text-red-500">{errors.baths.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="square_feet">
                  Square Feet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="square_feet"
                  type="number"
                  min="0"
                  {...register("square_feet", { valueAsNumber: true })}
                />
                {errors.square_feet && (
                  <p className="text-sm text-red-500">
                    {errors.square_feet.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>
              Select all amenities that apply to your property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity_${amenity.toLowerCase().replace(/ /g, "_")}`}
                    checked={watchedAmenities?.includes(amenity) || false}
                    onCheckedChange={(checked) =>
                      handleAmenitiesChange(amenity, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`amenity_${amenity
                      .toLowerCase()
                      .replace(/ /g, "_")}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
            {errors.amenities && (
              <p className="text-sm text-red-500">{errors.amenities.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-4">
            <DollarSign className="h-5 w-5 mr-2 text-primary" />
            <div>
              <CardTitle>Rental Rates</CardTitle>
              <CardDescription>
                Set your pricing (leave blank if not applicable)
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weekly">Weekly Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="weekly"
                    type="number"
                    min="0"
                    className="pl-8"
                    placeholder="0"
                    {...register("rates.weekly", {
                      valueAsNumber: true,
                      setValueAs: (v) => (v === "" ? null : v),
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="monthly"
                    type="number"
                    min="0"
                    className="pl-8"
                    placeholder="0"
                    {...register("rates.monthly", {
                      valueAsNumber: true,
                      setValueAs: (v) => (v === "" ? null : v),
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nightly">Nightly Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="nightly"
                    type="number"
                    min="0"
                    className="pl-8"
                    placeholder="0"
                    {...register("rates.nightly", {
                      valueAsNumber: true,
                      setValueAs: (v) => (v === "" ? null : v),
                    })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-4">
            <User className="h-5 w-5 mr-2 text-primary" />
            <div>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How can potential renters reach you?
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="seller_name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="seller_name"
                  placeholder="John Doe"
                  {...register("seller_info.name")}
                />
                {errors.seller_info?.name && (
                  <p className="text-sm text-red-500">
                    {errors.seller_info.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seller_email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="seller_email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("seller_info.email")}
                />
                {errors.seller_info?.email && (
                  <p className="text-sm text-red-500">
                    {errors.seller_info.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seller_phone">Phone Number</Label>
                <Input
                  id="seller_phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  {...register("seller_info.phone")}
                />
                {errors.seller_info?.phone && (
                  <p className="text-sm text-red-500">
                    {errors.seller_info.phone.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Property...
              </>
            ) : (
              "Update Property"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyEditForm;
