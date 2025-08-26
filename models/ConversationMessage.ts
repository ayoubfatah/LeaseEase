import { Schema, model, models } from "mongoose";

const ConversationMessageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

ConversationMessageSchema.index({ conversation: 1, createdAt: -1 });

const ConversationMessage =
  models.ConversationMessage ||
  model("ConversationMessage", ConversationMessageSchema);

export default ConversationMessage;
