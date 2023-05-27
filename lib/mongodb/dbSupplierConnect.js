import mongoose from "mongoose";

export default async function dbBankConnect() {
  await mongoose.connect(process.env.SUPPLIER_MONGODB_URI);
}
