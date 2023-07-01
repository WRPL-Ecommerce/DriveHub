import mongoose from "mongoose";

export async function dbConnect() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
}

export const eshopping = mongoose.connection.useDb("eshopping");
