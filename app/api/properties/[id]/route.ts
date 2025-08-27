import connectDB from "@/config/database";
import Property from "@/models/Property";
import Messages from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";
import { private_safeAlpha } from "@mui/system";
import Conversation from "@/models/Conversation";

//GET api/properties/id
export const GET = async (request: any, { params }: { params: any }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};

export const DELETE = async (request: any, { params }: { params: any }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();
    //   check for session
    if (!sessionUser || !sessionUser.userId)
      return new Response("unauthorized", { status: 401 });

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);
    if (!property) {
      return new Response("property not found ", { status: 401 });
    }
    //  verifying ownership
    if (property.owner.toString() !== userId) {
      return new Response("unauthorized   ", { status: 401 });
    }
    await property.deleteOne();
    // Cascade delete messages linked to this property to avoid orphaned messages
    await Messages.deleteMany({ property: propertyId });
    await Conversation.deleteMany({ property: propertyId });
    return new Response("property deleted  ", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};

// POST api/properties/id/edit

export const PUT = async (request: any, { params }: { params: any }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const { id } = params;
    const formData = await request.formData();

    // get property to update
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }
    // check ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

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
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities: formData.getAll("amenities"),
      rates: {
        weekly: formData.get("rates.weekly") as string,
        monthly: formData.get("rates.monthly") as string,
        nightly: formData.get("rates.nightly") as string,
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    //

    // Update property in the database
    const updatedProperty = await Property.findByIdAndUpdate(
      params.id,
      propertyData
    );

    // return Response.redirect(
    //   `${process.env.NEXTAUTH_URL}/properties/${existingProperty._id}`
    // );

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    console.error("Error processing form data:", error);
    return new Response(
      JSON.stringify({ message: "Failed to process form data" }),
      { status: 500 }
    );
  }
};
