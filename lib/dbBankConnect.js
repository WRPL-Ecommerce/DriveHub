import mongoose from "mongoose";

export default async function dbBankConnect() {
  await mongoose.connect(process.env.BANK_MONGODB_URI);
}
