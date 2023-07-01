import mongoose from "mongoose";
import { eshopping } from "@/lib/dbConnect";

const customerSchema = new mongoose.Schema({
  customerID: String,
  company: String,
  contact_name: String,
  country_region: String,
  email: String,
});

export const Customer = eshopping.model("Customer", customerSchema);
