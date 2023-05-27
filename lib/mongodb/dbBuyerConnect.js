import mongoose from "mongoose";

export default async function dbBuyerConnect() {
  await mongoose.connect(process.env.BUYER_MONGODB_URI);
}
