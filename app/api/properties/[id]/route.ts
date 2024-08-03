import connectedDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/:id
export const GET = async (request: any, { params }: any) => {
  try {
    await connectedDB();

    const property = await Property.findById(params.id);
    console.log(property);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Property not found", { status: 500 });
  }
};
