import mongoose from "mongoose";
import { eshopping } from "@/lib/dbConnect";

const supplierSchema = new mongoose.Schema({
  supplier_name: String,
});

export const Supplier = eshopping.model("Supplier", supplierSchema);
