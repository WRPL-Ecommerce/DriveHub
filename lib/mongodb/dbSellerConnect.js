import mongoose from "mongoose";

export default async function dbBuyerConnect() {
  await mongoose.connect(process.env.SELLER_MONGODB_URI);
}