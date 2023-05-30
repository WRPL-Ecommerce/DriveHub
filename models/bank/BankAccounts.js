import mongoose from "mongoose";

const dbBank = mongoose.connection.useDb("banking");

const bankAccountSchema = new mongoose.Schema({
  accountNumber: String,
  bankName: String,
  accountHolderName: String,
  balance: Number,
  email: String,
  phone: String,
});

export const BankAccount = dbBank.model("BankAccount", bankAccountSchema);
