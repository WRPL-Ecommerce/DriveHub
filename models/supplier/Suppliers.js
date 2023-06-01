import mongoose from "mongoose";

const dbSupplier = mongoose.connection.useDb("supplier");

const supplierSchema = new mongoose.Schema({
  supplierName: String,
  contactNumber: String,
  email: String,
  address: String,
  supplierId: String,
});

export const Supplier = dbSupplier.model("Supplier", supplierSchema);
