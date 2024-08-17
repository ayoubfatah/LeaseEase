import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/user/[id]
export const GET = async (request: any, { params }: any) => {
  try {
    await connectDB();
    const userId = params.id;
    if (!userId) {
      return new Response("User id is required", { status: 400 });
    }
    const properties = await Property.find({ owner: userId });

    if (!properties) {
      console.log("Property not found.");
      return new Response("User doesn't exist ", { status: 404 });
    }

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
