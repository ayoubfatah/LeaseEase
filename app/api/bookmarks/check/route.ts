import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// for vercel
export const dynamic = "force-dynamic";

export const POST = async (request: any) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    // find user in data base
    const user = await User.findOne({ _id: userId });
    //  checking if property is already bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("something went wrong", { status: 500 });
  }
};
