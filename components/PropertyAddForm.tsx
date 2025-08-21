"use client";
import type React from "react";

import { useState } from "react";
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

const PropertyAddForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
    type: "Apartment",
    name: "Cozy Downtown Apartment",
    description: "A beautiful apartment in the heart of the city",
    location: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipcode: "12345",
    },
    beds: 2,
    baths: 2,
    square_feet: 1000,
    amenities: ["Wifi", "Full kitchen"],
    rates: {
      weekly: 1000,
      monthly: 3500,
      nightly: 150,
    },
    seller_info: {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // checking if its nested property
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setFormData((prevData: any) => ({
        ...prevData,
        [outerKey]: {
          ...prevData[outerKey],
          [innerKey]: value,
        },
      }));
      // not nested
    } else {
      setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleAmenitiesChange = (amenity: string, checked: boolean) => {
    const amenities = [...formData.amenities];
    if (checked) {
      amenities.push(amenity);
    } else {
      const index = amenities.indexOf(amenity);
      if (index !== -1) {
        amenities.splice(index, 1);
      }
    }
    setFormData((prev: any) => ({
      ...prev,
      amenities: amenities,
    }));
  };

  const handleImageChange = (e: any) => {
    const { files } = e.target;
    console.log(files);
    const updatedImages = [...formData.images];
    // add new files to the array
    for (const file of files) {
      updatedImages.push(file);
    }
    setFormData((prev: any) => ({ ...prev, images: updatedImages }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
        <p className="text-muted-foreground">Create a new property listing</p>
      </div>

      <form
        action="/api/properties"
        method="POST"
        encType="multipart/form-data"
        className="space-y-8"
      >
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
              <Label htmlFor="type">Property Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
                required
              >
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
              {/* Submit the selected type to the server */}
              <input type="hidden" name="type" value={formData.type} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Listing Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Beautiful Apartment In Miami"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add an optional description of your property"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
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
                name="location.street"
                placeholder="123 Main Street"
                value={formData.location.street}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location.city">City</Label>
                <Input
                  id="location.city"
                  name="location.city"
                  placeholder="City"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location.state">State</Label>
                <Input
                  id="location.state"
                  name="location.state"
                  placeholder="State"
                  value={formData.location.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location.zipcode">ZIP Code</Label>
                <Input
                  id="location.zipcode"
                  name="location.zipcode"
                  placeholder="12345"
                  value={formData.location.zipcode}
                  onChange={handleChange}
                />
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
                <Label htmlFor="beds">Bedrooms</Label>
                <Input
                  id="beds"
                  name="beds"
                  type="number"
                  min="0"
                  value={formData.beds}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baths">Bathrooms</Label>
                <Input
                  id="baths"
                  name="baths"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.baths}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="square_feet">Square Feet</Label>
                <Input
                  id="square_feet"
                  name="square_feet"
                  type="number"
                  min="0"
                  value={formData.square_feet}
                  onChange={handleChange}
                  required
                />
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
                    checked={formData.amenities.includes(amenity)}
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
                  name="rates.nightly"
                  type="number"
                  min="0"
                  placeholder="150"
                  value={formData.rates.nightly || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rates.weekly">Weekly Rate ($)</Label>
                <Input
                  id="rates.weekly"
                  name="rates.weekly"
                  type="number"
                  min="0"
                  placeholder="1000"
                  value={formData.rates.weekly || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rates.monthly">Monthly Rate ($)</Label>
                <Input
                  id="rates.monthly"
                  name="rates.monthly"
                  type="number"
                  min="0"
                  placeholder="3500"
                  value={formData.rates.monthly || ""}
                  onChange={handleChange}
                />
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
              <Label htmlFor="seller_info.name">Full Name</Label>
              <Input
                id="seller_info.name"
                name="seller_info.name"
                placeholder="John Doe"
                value={formData.seller_info.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seller_info.email">Email Address</Label>
              <Input
                id="seller_info.email"
                name="seller_info.email"
                type="email"
                placeholder="john@example.com"
                value={formData.seller_info.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seller_info.phone">Phone Number</Label>
              <Input
                id="seller_info.phone"
                name="seller_info.phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.seller_info.phone}
                onChange={handleChange}
              />
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
                name="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                You can select multiple images at once
              </p>
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
