import connectDB from "@/config/database";
import Conversation from "@/models/Conversation";
import ConversationMessage from "@/models/ConversationMessage";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/conversations - list conversations for current user with last message and unread count
export const GET = async () => {
  try {
    await connectDB();
    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = session.userId;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .sort({ lastMessageAt: -1 })
      .populate("participants")
      .populate("property", "name images");

    const withMeta = await Promise.all(
      conversations.map(async (conv: any) => {
        const lastMsg = await ConversationMessage.find({
          conversation: conv._id,
        })
          .sort({ createdAt: -1 })
          .limit(1);
        const unreadCount = await ConversationMessage.countDocuments({
          conversation: conv._id,
          readBy: { $ne: userId },
          recipient: userId,
        });
        return {
          _id: conv._id,
          participants: conv.participants,
          property: conv.property,
          lastMessageAt: conv.lastMessageAt,
          lastMessage: lastMsg[0] || null,
          unreadCount,
        };
      })
    );

    return new Response(JSON.stringify(withMeta), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};

// POST /api/conversations - create or get a conversation between current user and other participant
export const POST = async (request: Request) => {
  try {
    await connectDB();
    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = session.userId;
    const { participantId, propertyId } = await request.json();
    if (!participantId) {
      return new Response(
        JSON.stringify({ message: "participantId required" }),
        {
          status: 400,
        }
      );
    }
    if (participantId === userId) {
      return new Response(
        JSON.stringify({ message: "Cannot chat with yourself" }),
        {
          status: 400,
        }
      );
    }

    const query: any = {
      participants: { $all: [userId, participantId], $size: 2 },
    };
    if (propertyId) {
      query.property = propertyId;
    }

    let conversation: any = await Conversation.findOne(query);
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, participantId],
        property: propertyId || undefined,
        lastMessageAt: new Date(),
      });
    }

    return new Response(JSON.stringify(conversation), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};
