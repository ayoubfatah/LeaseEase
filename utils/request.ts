import axios from "axios";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties
async function fetchProperties() {
  try {
    if (!apiDomain) {
      console.log("No API domain configured, returning empty array");
      return { properties: [] };
    }

    const res = await axios.get(`${apiDomain}/api/properties`, {
      headers: {
        "Cache-Control": "max-age=0",
      },
      timeout: 10000, // 10 second timeout
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch properties");
    }

    return res.data;
  } catch (error) {
    console.log("Error fetching properties:", error);
    // Return empty properties array during build time
    return { properties: [] };
  }
}

export { fetchProperties };

// fetch single property
async function fetchProperty(id: string) {
  try {
    if (!apiDomain) {
      console.log("No API domain configured, returning null");
      return null;
    }

    const res = await axios.get(`${apiDomain}/api/properties/${id}`, {
      timeout: 10000, // 10 second timeout
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch property");
    }

    return res.data;
  } catch (error) {
    console.log("Error fetching property:", error);
    return null;
  }
}

export { fetchProperty };
