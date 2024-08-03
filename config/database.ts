import mongoose from "mongoose";
let connected = false;

const connectedDb = async () => {
  mongoose.set("strictQuery", true);
  //   if the database is already connected don't connect again
  if (connected) {
    console.log("Already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    connected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectedDb;
