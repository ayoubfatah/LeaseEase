import connectedDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";

// GET /api/properties
export const GET = async (request: NextRequest) => {
  try {
    await connectedDB();

    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const pageSize = Number(request.nextUrl.searchParams.get("pageSize"));
    const skip = (page - 1) * pageSize;

    let total = 0;
    try {
      total = await Property.estimatedDocumentCount();
    } catch (err) {
      total = await Property.countDocuments({});
    }
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    return NextResponse.json({ total, properties });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

// POST /api/properties
export const POST = async (request: NextRequest) => {
  try {
    console.log("[POST /api/properties] Connecting to DB...");
    await connectedDB();
    console.log("[POST /api/properties] DB connected");

    console.log("[POST /api/properties] Fetching session user...");
    const sessionUser = await getSessionUser();
    console.log("[POST /api/properties] Session user:", sessionUser);
    if (!sessionUser?.userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 401 }
      );
    }

    const { userId } = sessionUser;
    console.log("[POST /api/properties] Parsing formData...");
    const formData = await request.formData();
    console.log(
      "[POST /api/properties] formData keys:",
      Array.from(formData.keys())
    );

    const images = formData
      .getAll("images")
      .filter((img: any) => img.name !== "");
    console.log("[POST /api/properties] Images count:", images.length);

    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities: formData.getAll("amenities"),
      rates: {
        weekly: formData.get("rates.weekly") as string,
        monthly: formData.get("rates.monthly") as string,
        nightly: formData.get("rates.nightly") as string,
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
      images: [] as string[],
    };
    console.log("[POST /api/properties] propertyData (without images):", {
      ...propertyData,
      images: undefined,
    });

    // Upload images to Cloudinary
    console.log("[POST /api/properties] Uploading images to Cloudinary...");
    const imagesUploadPromises = images.map(async (image: any, idx: number) => {
      console.log(`[POST /api/properties] Uploading image #${idx + 1}...`);
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray).toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageData}`,
        { folder: "leasease" }
      );
      console.log(
        `[POST /api/properties] Uploaded image #${idx + 1}:`,
        result?.public_id
      );
      return result.secure_url;
    });

    propertyData.images = await Promise.all(imagesUploadPromises);
    console.log(
      "[POST /api/properties] Uploaded images count:",
      propertyData.images.length
    );

    console.log("[POST /api/properties] Creating Property document...");
    const newProperty = new Property(propertyData);
    await newProperty.save();
    console.log("[POST /api/properties] Property saved:", newProperty._id);

    // Redirect
    console.log("[POST /api/properties] Redirecting to property page...");
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
      },
    });
  } catch (error) {
    console.error("[POST /api/properties] Error processing form data:", error);
    return NextResponse.json(
      { message: "Failed to process form data" },
      { status: 500 }
    );
  }
};
