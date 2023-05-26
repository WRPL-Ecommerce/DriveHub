import mongoose from "mongoose";

export default async function dbBankConnect() {
  await mongoose.connect(process.env.SHIPPER_MONGODB_URI);
}