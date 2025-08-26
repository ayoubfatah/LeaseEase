import connectDB from "@/config/database";
import Conversation from "@/models/Conversation";
import ConversationMessage from "@/models/ConversationMessage";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/conversations/:id - fetch thread messages
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = session.userId;
    const conversationId = params.id;

    const conversation: any = await Conversation.findById(conversationId)
      .populate("participants")
      .populate("property", "name");
    if (!conversation) {
      return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
      });
    }
    if (
      !conversation.participants.some((p: any) => p._id.toString() === userId)
    ) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }

    const messages = await ConversationMessage.find({
      conversation: conversationId,
    })
      .sort({ createdAt: 1 })
      .populate("sender")
      .populate("recipient");

    return new Response(JSON.stringify({ conversation, messages }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};

// POST /api/conversations/:id - send message
export const POST = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = session.userId;
    const conversationId = params.id;
    const { body } = await req.json();
    if (!body || typeof body !== "string" || !body.trim()) {
      return new Response(
        JSON.stringify({ message: "Message body required" }),
        {
          status: 400,
        }
      );
    }

    const conversation: any = await Conversation.findById(conversationId);
    if (!conversation) {
      return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
      });
    }
    if (!conversation.participants.some((p: any) => p.toString() === userId)) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }

    const recipientId = conversation.participants.find(
      (p: any) => p.toString() !== userId
    );

    const message = await ConversationMessage.create({
      conversation: conversationId,
      sender: userId,
      recipient: recipientId,
      body,
      readBy: [userId],
    });
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessageAt: new Date(),
    });

    return new Response(JSON.stringify(message), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};

// PUT /api/conversations/:id/read - mark all as read for current user
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = session.userId;
    const conversationId = params.id;

    await ConversationMessage.updateMany(
      {
        conversation: conversationId,
        recipient: userId,
        readBy: { $ne: userId },
      },
      { $push: { readBy: userId } }
    );

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};
