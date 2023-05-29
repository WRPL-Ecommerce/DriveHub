import mongoose from "mongoose";

const dbSupplier = mongoose.connection.useDb("supplier");

const supplierInventorySchema = new mongoose.Schema({
  supplierId: String,
  carMake: String,
  carModel: String,
  year: Number,
  price: Number,
});

export const SupplierInventory = dbSupplier.model(
  "SupplierInventory",
  supplierInventorySchema
);
