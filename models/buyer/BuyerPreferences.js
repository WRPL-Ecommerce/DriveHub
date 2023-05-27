import mongoose from "mongoose";

const buyerPreferenceSchema = new mongoose.Schema({
  buyerId: String,
  carMake: String,
  carModel: String,
  maximumPrice: Number,
});

export const BuyerPreference = mongoose.model(
  "BuyerPreference",
  buyerPreferenceSchema
);
