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

const PropertyEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    type: "",
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
    amenities: ["", ""],
    rates: {
      weekly: 0,
      monthly: 0,
      nightly: 0,
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) {
        return;
      }
      try {
        const data = await fetchProperty(id as string);
        // check rates for null if so make it 0
        if (data && !data.rates) {
          const defaultRates = { ...data.rates };
          for (const key in defaultRates) {
            if (defaultRates[key] === null) {
              defaultRates[key] = 0;
            }
          }
          data.rates = defaultRates;
        }
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPropertyData();
  }, [id]);

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

  const handleSelectChange = (value: string) => {
    setFormData((prevData: any) => ({ ...prevData, type: value }));
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData(e.target as HTMLFormElement);
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (res.ok) {
        toast.success("Property updated successfully");
        router.push(`/properties/${id}`);
      }
      if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      }
      if (res.status === 404) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsSubmitting(false);
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

      <form onSubmit={handleSubmit} className="space-y-8">
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
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={handleSelectChange}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Add an optional description of your property"
                value={formData.description}
                onChange={handleChange}
                className="resize-none"
              />
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
                  name="location.street"
                  placeholder="123 Main Street"
                  value={formData.location.street}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="location.city"
                  placeholder="Miami"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  name="location.state"
                  placeholder="FL"
                  value={formData.location.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                  id="zipcode"
                  name="location.zipcode"
                  placeholder="33101"
                  value={formData.location.zipcode}
                  onChange={handleChange}
                />
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
                <Label htmlFor="beds">Bedrooms *</Label>
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
                <Label htmlFor="baths">Bathrooms *</Label>
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
                <Label htmlFor="square_feet">Square Feet *</Label>
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
                    name="rates.weekly"
                    type="number"
                    min="0"
                    className="pl-8"
                    placeholder="0"
                    value={formData.rates.weekly || ""}
                    onChange={handleChange}
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
                    name="rates.monthly"
                    type="number"
                    min="0"
                    className="pl-8"
                    placeholder="0"
                    value={formData.rates.monthly || ""}
                    onChange={handleChange}
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
                    name="rates.nightly"
                    type="number"
                    min="0"
                    className="pl-8"
                    placeholder="0"
                    value={formData.rates.nightly || ""}
                    onChange={handleChange}
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
                <Label htmlFor="seller_name">Full Name *</Label>
                <Input
                  id="seller_name"
                  name="seller_info.name"
                  placeholder="John Doe"
                  value={formData.seller_info.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seller_email">Email Address *</Label>
                <Input
                  id="seller_email"
                  name="seller_info.email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.seller_info.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seller_phone">Phone Number</Label>
                <Input
                  id="seller_phone"
                  name="seller_info.phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.seller_info.phone}
                  onChange={handleChange}
                />
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
