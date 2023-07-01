import mongoose from "mongoose";
import { eshopping } from "@/lib/dbConnect";

const managerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
});

export const Manager = eshopping.model("Manager", managerSchema);
