// Import necessary mongoose components
import { Schema, model, models } from "mongoose";

// Define the User schema structure
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"], // Make username a required field with custom error message
      unique: [true, "Username already exists"], // Ensure usernames are unique with custom error message
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Make email a required field with custom error message
      unique: [true, "Email already exists"], // Ensure emails are unique with custom error message
    },
    image: {
      type: String, // Store user profile image URL as a string
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId, // Array of MongoDB ObjectIds
        ref: "Property", // Reference to the Property model for populating queries
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Check if the model exists already (for Next.js hot reloading)
// If it exists, use it; otherwise, create a new model
const User = models?.User || model("User", UserSchema);

// Export the User model for use in other files
export default User;



