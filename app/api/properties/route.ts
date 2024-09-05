import connectedDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (request: any) => {
  try {
    await connectedDB();
    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 3;
    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments({});

    const properties = await Property.find({}).skip(skip).limit(pageSize);
    const result = {
      total,
      properties,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};

export const POST = async (request: any) => {
  try {
    await connectedDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const formData = await request.formData();

    // Create propertyData OBJECT FOR THE DATABASE
    const images = formData
      .getAll("images")
      .filter((img: any) => img.name !== "");

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
      images: [] as string[], // Initialize as empty array
    };

    // Uploading the images
    const imagesUploadPromises = images.map(async (image: any) => {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray).toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageData}`,
        { folder: "leasease" }
      );
      return result.secure_url;
    });

    // Wait for all images to upload
    const uploadedImages = await Promise.all(imagesUploadPromises);
    propertyData.images = uploadedImages;

    const newProperty = new Property(propertyData);
    console.log(newProperty);
    await newProperty.save();

    // Redirect to the newly created property page
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.error("Error processing form data:", error);
    return new Response(
      JSON.stringify({ message: "Failed to process form data" }),
      { status: 500 }
    );
  }
};
