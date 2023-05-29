import mongoose from "mongoose";

const dbShipper = mongoose.connection.useDb("shipper");

const shipperSchema = new mongoose.Schema({
  shipperName: String,
  contactNumber: String,
  email: String,
  address: String,
});

export const Shipper = dbShipper.model("Shipper", shipperSchema);
