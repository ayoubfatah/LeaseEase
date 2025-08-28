import connectDB from "@/config/database";
import Messages from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath, revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";
// POST /api/messages

export const POST = async (request: any) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    const { email, phone, message, property, recipient, name } =
      await request.json();

    console.log("Received data:", {
      email,
      phone,
      message,
      property,
      recipient,
      name,
    });

    const sessionUser = await getSessionUser();
    console.log("Session user:", sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      console.log("User not logged in");
      return new Response(
        JSON.stringify({ message: "You must be logged in" }),
        {
          status: 401,
        }
      );
    }

    const { user } = sessionUser;
    // cant send message to self
    if (recipient === user.id) {
      console.log("Attempt to send message to self");
      return new Response(
        JSON.stringify({ message: "Cannot send message to yourself" }),
        {
          status: 400,
        }
      );
    }

    const newMessage = new Messages({
      sender: user.id,
      recipient,
      name,
      property,
      email,
      body: message,
      phone,
    });

    await newMessage.save();
    revalidateTag("notifications");

    console.log("Message saved successfully");
    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in POST /api/messages:", error);
    return new Response(JSON.stringify({ message: "Error sending message" }), {
      status: 500,
    });
  }
};

// Get /api/messages

export const GET = async () => {
  try {
    console.log("Connecting to the database...");
    await connectDB();

    const sessionUser = await getSessionUser();
    console.log("Session user for GET:", sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      console.log("User ID is required");
      return new Response(JSON.stringify("user id is required "), {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    console.log("Fetching messages for user ID:", userId);

    const readMessages = await Messages.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) //sort read msgs in ascending order
      .populate("sender", "name")
      .populate("property", "name");

    const unReadMessages = await Messages.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) //sort read msgs in ascending order
      .populate("sender", "name")
      .populate("property", "name");

    // Filter out messages whose related property or sender has been deleted
    const messages = [...unReadMessages, ...readMessages].filter(
      (msg: any) => msg.sender && msg.property
    );
    console.log("Fetched messages:", messages);

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/messages:", error);
    return new Response(JSON.stringify({ message: "Error sending message" }), {
      status: 500,
    });
  }
};
