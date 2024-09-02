// TESTING model
import { Schema, model, models } from "mongoose";

const TestingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { timestamps: true }
);

const Testing = models?.Testing || model("Testing", TestingSchema);

export default Testing;
