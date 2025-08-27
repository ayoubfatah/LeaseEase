"use client";
import type React from "react";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, MapPin, Bed, DollarSign, User, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

// Zod schema based on your Mongoose schema
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
  images: z.array(z.instanceof(File)).optional(),
});

type PropertyFormData = z.input<typeof propertySchema>;

const PropertyAddForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
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
      images: [],
    },
  });

  const watchedAmenities = watch("amenities");
  const watchedImages = watch("images");

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setValue("images", fileArray);
    }
  };
  const onSubmit = async (data: PropertyFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      // Append all fields (same as before)...
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
      (data.amenities ?? []).forEach((amenity) =>
        formData.append("amenities", amenity)
      );
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
      if (data.images)
        data.images.forEach((image) => formData.append("images", image));

      const response = await fetch("/api/properties", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const createdProperty = await response.json(); // Assuming API returns created property with `id` or `slug`
        toast.success("Property created successfully!");
        reset(); // Reset the form
        redirect(`/properties/${createdProperty.id}`); // Redirect to the property page
      } else {
        toast.error("Failed to create property");
        console.error("Failed to create property");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
        <p className="text-muted-foreground">Create a new property listing</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Details
            </CardTitle>
            <CardDescription>
              Basic information about your property
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Add an optional description of your property"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location
            </CardTitle>
            <CardDescription>Where is your property located?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location.street">Street Address</Label>
              <Input
                id="location.street"
                {...register("location.street")}
                placeholder="123 Main Street"
              />
              {errors.location?.street && (
                <p className="text-sm text-red-500">
                  {errors.location.street.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location.city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location.city"
                  {...register("location.city")}
                  placeholder="City"
                />
                {errors.location?.city && (
                  <p className="text-sm text-red-500">
                    {errors.location.city.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location.state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location.state"
                  {...register("location.state")}
                  placeholder="State"
                />
                {errors.location?.state && (
                  <p className="text-sm text-red-500">
                    {errors.location.state.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location.zipcode">ZIP Code</Label>
                <Input
                  id="location.zipcode"
                  {...register("location.zipcode")}
                  placeholder="12345"
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

        {/* Property Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Property Specifications
            </CardTitle>
            <CardDescription>
              Details about the property size and layout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>
              Select all amenities that apply to your property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
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
              ].map((amenity) => (
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

        {/* Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing
            </CardTitle>
            <CardDescription>
              Set your rental rates (leave blank if not applicable)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rates.nightly">Nightly Rate ($)</Label>
                <Input
                  id="rates.nightly"
                  type="number"
                  min="0"
                  placeholder="150"
                  {...register("rates.nightly", {
                    valueAsNumber: true,
                    setValueAs: (v) => (v === "" ? null : v),
                  })}
                />
                {errors.rates?.nightly && (
                  <p className="text-sm text-red-500">
                    {errors.rates.nightly.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="rates.weekly">Weekly Rate ($)</Label>
                <Input
                  id="rates.weekly"
                  type="number"
                  min="0"
                  placeholder="1000"
                  {...register("rates.weekly", {
                    valueAsNumber: true,
                    setValueAs: (v) => (v === "" ? null : v),
                  })}
                />
                {errors.rates?.weekly && (
                  <p className="text-sm text-red-500">
                    {errors.rates.weekly.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="rates.monthly">Monthly Rate ($)</Label>
                <Input
                  id="rates.monthly"
                  type="number"
                  min="0"
                  placeholder="3500"
                  {...register("rates.monthly", {
                    valueAsNumber: true,
                    setValueAs: (v) => (v === "" ? null : v),
                  })}
                />
                {errors.rates?.monthly && (
                  <p className="text-sm text-red-500">
                    {errors.rates.monthly.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seller Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Your contact details for potential renters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seller_info.name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="seller_info.name"
                {...register("seller_info.name")}
                placeholder="John Doe"
              />
              {errors.seller_info?.name && (
                <p className="text-sm text-red-500">
                  {errors.seller_info.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="seller_info.email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="seller_info.email"
                type="email"
                {...register("seller_info.email")}
                placeholder="john@example.com"
              />
              {errors.seller_info?.email && (
                <p className="text-sm text-red-500">
                  {errors.seller_info.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="seller_info.phone">Phone Number</Label>
              <Input
                id="seller_info.phone"
                type="tel"
                {...register("seller_info.phone")}
                placeholder="(555) 123-4567"
              />
              {errors.seller_info?.phone && (
                <p className="text-sm text-red-500">
                  {errors.seller_info.phone.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Property Images
            </CardTitle>
            <CardDescription>
              Upload photos of your property to attract more renters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="images">Select Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                You can select multiple images at once
              </p>
              {watchedImages && watchedImages.length > 0 && (
                <p className="text-sm text-green-600">
                  {watchedImages.length} image(s) selected
                </p>
              )}
              {errors.images && (
                <p className="text-sm text-red-500">{errors.images.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="min-w-[200px]"
          >
            {loading ? "Creating Property..." : "Create Property"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyAddForm;
