import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
  accountNumber: String,
  bankName: String,
  accountHolderName: String,
  balance: Number,
  email: String,
  phone: String,
});

export const BankAccount = mongoose.model("BankAccount", bankAccountSchema);
