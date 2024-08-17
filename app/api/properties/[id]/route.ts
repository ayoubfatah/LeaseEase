import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

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
    return new Response("property deleted  ", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
