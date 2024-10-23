import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// PUT /api/users/:id
export const PUT = async (request: any, { params }: { params: any }) => {
  try {
    // Connect to the database
    await connectDB();

    // Get the session user (for authentication purposes)
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "User not authenticated" }),
        {
          status: 401,
        }
      );
    }

    // Extract user ID from params
    const { id } = params;

    // Parse the incoming request body (assume it's JSON)
    const body = await request.json();
    const { username } = body;

    // Check if required data is provided
    if (!username) {
      return new Response(JSON.stringify({ message: "Username is required" }), {
        status: 400,
      });
    }

    // Find the user by ID and check if they exist
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Check if the session user is the same as the user being updated
    if (existingUser._id.toString() !== sessionUser.userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // Update the user's username and set updatedAt
    existingUser.username = username;
    existingUser.updatedAt = new Date();

    // Save the updated user
    await existingUser.save();

    // Return the updated user data
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: "Failed to update user" }), {
      status: 500,
    });
  }
};
