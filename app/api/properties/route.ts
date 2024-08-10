import connectedDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

import { request } from "http";
// GET /api/properties
export const GET = async (request: any) => {
  try {
    await connectedDB();
    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
export const POST = async (request: any) => {
  try {
    await connectedDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const formData = await request.formData();

    // Create propertyData OBJECT FOR THE DATABASE
    const images = formData
      .getAll("images")
      .filter((img: any) => img.name !== ""); // Adjusted to any to avoid TypeScript errors
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: parseInt(formData.get("beds") as string, 10),
      baths: parseInt(formData.get("baths") as string, 10),
      square_feet: parseInt(formData.get("square_feet") as string, 10),
      amenities: formData.getAll("amenities"),
      rates: {
        weekly: parseFloat(formData.get("rates.weekly") as string),
        monthly: parseFloat(formData.get("rates.monthly") as string),
        nightly: parseFloat(formData.get("rates.nightly") as string),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,

      // Consider how to handle images, e.g., upload separately or include in propertyData
    };

    console.log("Property data:", propertyData);
    const newProperty = new Property(propertyData);
    await newProperty.save();

    // Respond with JSON data
    return new Response(
      JSON.stringify({
        message: "Property added successfully",
        property: newProperty,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing form data:", error);
    return new Response(
      JSON.stringify({ message: "Failed to process form data" }),
      { status: 500 }
    );
  }
};
