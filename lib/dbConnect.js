import mongoose from "mongoose";

export default async function dbConnect() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
}
