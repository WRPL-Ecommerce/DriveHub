import mongoose from "mongoose";
import { eshopping } from "@/lib/dbConnect";

const departmentSchema = new mongoose.Schema({
  departmentID: Number,
  departmentName: String,
});

export const Department = eshopping.model("Department", departmentSchema);
