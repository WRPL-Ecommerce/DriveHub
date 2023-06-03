import { Buyer } from "@/models/buyer/Buyers";
import dbConnect from "@/lib/dbConnect";
import { BuyerPreference } from "@/models/buyer/BuyerPreferences";
import { BankAccount } from "@/models/bank/BankAccounts";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== "POST") res.status(200).json({ message: "other method" });
  else {
    // input new buyer
    let data;
    try {
      data = JSON.parse(req.body);
    } catch (error) {
      data = req.body;
    }
    console.log(data);

    try {
      await Buyer.create(data.buyer);

      const { _id } = await Buyer.findOne({ email: data.buyer.email });
      data.buyerPreference.buyerId = _id.toString();

      await BuyerPreference.create(data.buyerPreference);

      await BankAccount.create(data.bankAccount);

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
