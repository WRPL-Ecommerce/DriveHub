import mongoose from "mongoose";

const shipperSchema = new mongoose.Schema({
  shipperName: String,
  contactNumber: Number,
  email: String,
  address: String,
});

export const Shipper = mongoose.model("Shipper", shipperSchema);
