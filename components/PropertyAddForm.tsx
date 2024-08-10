"use client";
import { useState } from "react";

const PropertyAddForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
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

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    // clone the current array
    const amenities = [...formData.amenities];
    // add value to array
    if (checked) {
      amenities.push(value);
    } else {
      // else remove value form array
      const index = amenities.indexOf(value);
      if (index !== 1) {
        amenities.splice(index, 1);
      }
    }
    setFormData((prev: any) => ({
      ...prev,
      amenities: amenities,
    }));
    // update state
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
    <form action="/api/properties" method="POST" encType="multipart/form-data">
      <h2 className="text-3xl text-center font-semibold mb-6">Add Property</h2>

      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          type="text"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          name="description"
          className="border rounded w-full py-2 px-3"
          rows={4}
          placeholder="Add an optional description of your property"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          value={formData.location.street}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          value={formData.location.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          value={formData.location.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          value={formData.location.zipcode}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            name="beds"
            className="border rounded w-full py-2 px-3"
            value={formData.beds}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
            Baths
          </label>
          <input
            type="number"
            name="baths"
            className="border rounded w-full py-2 px-3"
            value={formData.baths}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="square_feet"
            className="block text-gray-700 font-bold mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            name="square_feet"
            className="border rounded w-full py-2 px-3"
            value={formData.square_feet}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
            <div key={amenity}>
              <input
                type="checkbox"
                id={`amenity_${amenity.toLowerCase().replace(/ /g, "_")}`}
                value={amenity}
                checked={formData.amenities.includes(amenity)}
                className="mr-2"
                onChange={handleAmenitiesChange}
              />
              <label
                htmlFor={`amenity_${amenity.toLowerCase().replace(/ /g, "_")}`}
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="rate.weekly" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
              value={formData.rates.weekly || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="rate.monthly" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
              value={formData.rates.monthly || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="rate.nightly" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              name="rates.nightly"
              className="border rounded w-full py-2 px-3"
              value={formData.rates.nightly || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Seller Information
        </label>
        <input
          type="text"
          name="seller_info.name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Name"
          value={formData.seller_info.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Email"
          value={formData.seller_info.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="seller_info.phone"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Phone"
          value={formData.seller_info.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Images</label>
        <input
          type="file"
          name="images"
          multiple
          className="border rounded w-full py-2 px-3"
          onChange={handleImageChange}
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default PropertyAddForm;
