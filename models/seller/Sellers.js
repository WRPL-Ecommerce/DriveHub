import mongoose from "mongoose";

const dbSeller = mongoose.connection.useDb("seller")

const sellerSchema = new mongoose.Schema({
  sellerName: String,
  contactNumber: Number,
  email: String,
  address: String,
});

export const Seller = dbSeller.model("Seller", sellerSchema);
