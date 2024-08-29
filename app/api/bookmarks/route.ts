import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// for vercel
export const dynamic = "force-dynamic";

// get /api/bookmarks

export const GET = async () => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    // find user in data base
    const user = await User.findOne({ _id: userId });
    // get users bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    return new Response(" something went wrong ", { status: 5000 });
  }
};

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
    let message;
    if (isBookmarked) {
      // if already bookmarked remove it
      user.bookmarks.pull(propertyId);
      message = "bookmark removed successfully ";
      isBookmarked = false;
    } else {
      // if not bookmarked add it
      user.bookmarks.push(propertyId);
      message = "bookmark added successfully ";
      isBookmarked = true;
    }

    await user.save();
    return new Response(JSON.stringify({ isBookmarked, message }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("something went wrong", { status: 500 });
  }
};
