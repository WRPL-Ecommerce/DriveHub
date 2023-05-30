import mongoose from "mongoose";

const dbSeller = mongoose.connection.useDb("seller");

const sellerSchema = new mongoose.Schema({
  sellerId: String,
  sellerName: String,
  contactNumber: Number,
  email: String,
  address: String,
  sellerId: String,
});

export const Seller = dbSeller.model("Seller", sellerSchema);
