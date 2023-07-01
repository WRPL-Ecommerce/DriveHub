import mongoose from "mongoose";
import { eshopping } from "@/lib/dbConnect";

const cartSchema = new mongoose.Schema({
  email: String,
  product_id: String,
});

export const Cart = eshopping.model("Cart", cartSchema);
