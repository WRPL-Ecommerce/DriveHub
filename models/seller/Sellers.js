import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  sellerName: String,
  contactNumber: Number,
  email: String,
  address: String,
});

export const Seller = mongoose.model("Seller", sellerSchema);
