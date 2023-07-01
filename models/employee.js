import mongoose from "mongoose";
import { eshopping } from "@/lib/dbConnect";

const employeeSchema = new mongoose.Schema({
  employeeID: Number,
  first_name: String,
  last_name: String,
  gender: String,
  salary: Number,
});

export const Employee = eshopping.model("Employee", employeeSchema);
