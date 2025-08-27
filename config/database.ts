import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

const getCachedConnection = () => {
  if (!global.mongooseConnection) {
    global.mongooseConnection = { conn: null, promise: null };
  }
  return global.mongooseConnection;
};

const connectDB = async () => {
  const cached = getCachedConnection();

  console.log("ENV keys:", Object.keys(process.env));
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  if (cached.conn) {
    console.log("MongoDB is already connected...");
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI as string | undefined;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10000,
        family: 4, // force IPv4 to avoid IPv6/DNS issues
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected...");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.log("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
