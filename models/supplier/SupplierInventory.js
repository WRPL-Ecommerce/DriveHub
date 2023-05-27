import mongoose from "mongoose";

const supplierInventorySchema = new mongoose.Schema({
  supplierId: String,
  carMake: String,
  carModel: String,
  year: Number,
  price: Number,
});

export const SupplierInventory = mongoose.model(
  "SupplierInventory",
  supplierInventorySchema
);
