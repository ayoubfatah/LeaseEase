import { Schema, model, models } from "mongoose";

const ConversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: false,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ participants: 1, property: 1 }, { unique: false });

const Conversation =
  models.Conversation || model("Conversation", ConversationSchema);

export default Conversation;
