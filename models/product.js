import mongoose from "mongoose";
import { eshopping } from "@/lib/dbConnect";

const productSchema = new mongoose.Schema({
  productID: Number,
  productName: String,
  brand: String,
  price: Number,
  department: String,
  supplier: String,
});

export const Product = eshopping.model("Product", productSchema);
