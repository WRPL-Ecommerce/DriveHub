import mongoose from "mongoose";

const dbBuyer = mongoose.connection.useDb("buyer");

const buyerSchema = new mongoose.Schema({
  buyerName: String,
  contactNumber: String,
  email: String,
  address: String,
});

export const Buyer = dbBuyer.model("Buyer", buyerSchema);
