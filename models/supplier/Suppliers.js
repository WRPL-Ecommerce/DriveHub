import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplierName: String,
  contactNumber: Number,
  email: String,
  address: String,
});

export const Supplier = mongoose.model("Supplier", supplierSchema);
