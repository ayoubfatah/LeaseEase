import axios from "axios";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties
async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await axios.get(`${apiDomain}/properties`);

    if (res.status !== 200) {
      throw new Error("Failed to fetch properties");
    }

    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { fetchProperties };

// fetch single property
async function fetchProperty(id: string) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await axios.get(`${apiDomain}/properties/${id}`);

    if (res.status !== 200) {
      throw new Error("Failed to fetch property");
    }

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperty };
