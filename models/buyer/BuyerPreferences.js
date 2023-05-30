import mongoose from "mongoose";

const dbBuyer = mongoose.connection.useDb("buyer");


const buyerPreferenceSchema = new mongoose.Schema({
  buyerId: String,
  carMake: String,
  carModel: String,
  maximumPrice: Number,
});

export const BuyerPreference = dbBuyer.model(
  "BuyerPreference",
  buyerPreferenceSchema
);
