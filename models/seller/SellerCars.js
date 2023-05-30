import mongoose from "mongoose";

const dbSeller = mongoose.connection.useDb("seller");

const sellerCarSchema = new mongoose.Schema({
  sellerId: String,
  carMake: String,
  carModel: String,
  year: Number,
  price: Number,
});

export const SellerCar = dbSeller.model("SellerCar", sellerCarSchema);
