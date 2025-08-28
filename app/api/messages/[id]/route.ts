import connectDB from "@/config/database";
import Messages from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// PUT /api/message/id

export const PUT = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  try {
    connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      console.log("User ID is missing or invalid");
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Messages.findById(id);

    if (!message) {
      console.log("Message not found");
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });
    }

    // verify ownership
    if (message.recipient.toString() !== userId) {
      console.log("Unauthorized access attempt by user:", userId);
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    message.read = !message.read;

    revalidateTag("notifications");

    await message.save();
    console.log("Message updated and saved");

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const DELETE = async (request: any, { params }: { params: any }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    const { id } = params;

    if (!sessionUser || !sessionUser.userId) {
      console.log("User ID is missing or invalid");
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;

    //    check if it belongs to the owner
    const message = await Messages.findById(id);

    if (!message) {
      console.log("Message not found");
      return new Response(JSON.stringify({ message: "Message not found" }), {
        status: 404,
      });
    }

    // verify ownership
    if (message.recipient.toString() !== userId) {
      console.log("Unauthorized access attempt by user:", userId);
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    await message.deleteOne();
    return new Response("property deleted  ", { status: 200 });
  } catch (error) {}
};

// export const DELETE = async (request: any, { params }: { p arams: any }) => {
//     try {
//       const propertyId = params.id;
//       const sessionUser = await getSessionUser();
//       //   check for session
//       if (!sessionUser || !sessionUser.userId)
//         return new Response("unauthorized", { status: 401 });

//       const { userId } = sessionUser;

//       await connectDB();

//       const property = await Property.findById(propertyId);
//       if (!property) {
//         return new Response("property not found ", { status: 401 });
//       }
//       //  verifying ownership
//       if (property.owner.toString() !== userId) {
//         return new Response("unauthorized   ", { status: 401 });
//       }
//       await property.deleteOne();
//       return new Response("property deleted  ", { status: 200 });
//     } catch (error) {
//       console.log(error);
//       return new Response("Error", { status: 500 });
//     }
//   };
