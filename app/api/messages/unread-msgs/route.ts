import connectDB from "@/config/database";
import Messages from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

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

    return new Response(JSON.stringify({ count: unReadMessages.length }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error sending message" }), {
      status: 500,
    });
  }
};
