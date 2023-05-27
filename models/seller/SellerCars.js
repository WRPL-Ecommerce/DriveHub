import mongoose from "mongoose";

const sellerCarSchema = new mongoose.Schema({
  sellerId: String,
  carMake: String,
  carModel: String,
  year: Number,
  price: Number,
});

export const SellerCar = mongoose.model("SellerCar", sellerCarSchema);
