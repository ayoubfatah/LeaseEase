import connectedDB from "@/config/database";

import Property from "@/models/Property";
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
