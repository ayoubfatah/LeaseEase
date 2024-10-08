import connectDB from "@/config/database";
import Messages from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";
import { TableBody } from "@mui/material";
import { connect } from "http2";

export const dynamic = "force-dynamic";
// POST /api/messages

export const POST = async (request: any) => {
  try {
    await connectDB();
    const { email, phone, message, property, recipient, name } =
      await request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
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
    console.log(user, "user");
    console.log(newMessage, "newMessage");
    await newMessage.save();
    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Error sending message" }), {
      status: 500,
    });
  }
};

// Get /api/messages

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify("user id is required "), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
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

    const messages = [...unReadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error sending message" }), {
      status: 500,
    });
  }
};
