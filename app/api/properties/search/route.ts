import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/search
export const dynamic = "force-dynamic";

export const GET = async (request: any) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location ?? "", "i");

    let query: { $or: any[]; type?: RegExp } = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    console.log(location, propertyType);
    console.log(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", {
      status: 500,
    });
  }
};
