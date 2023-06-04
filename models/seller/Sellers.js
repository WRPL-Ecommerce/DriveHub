import mongoose from "mongoose";

const dbSeller = mongoose.connection.useDb("seller");

const sellerSchema = new mongoose.Schema({
  sellerId: String,
  sellerName: String,
  contactNumber: String,
  email: String,
  address: String,
  supplier: String,
});

export const Seller = dbSeller.model("Seller", sellerSchema);
