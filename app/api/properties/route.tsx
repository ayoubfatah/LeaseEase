import connectedDb from "@/config/database";

export const GET = async (request: any) => {
  try {
    await connectedDb();
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
