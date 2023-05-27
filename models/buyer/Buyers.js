import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
  buyerName: String,
  contactNumber: Number,
  email: String,
  address: String,
});

export const Buyer = mongoose.model("Buyer", buyerSchema);
