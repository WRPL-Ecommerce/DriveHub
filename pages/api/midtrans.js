import Midtrans from "midtrans-client";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method !== "POST") res.status(200).json({ message: "other method" });
  else {
    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-zel-khkbF-h3ZYCk_ZpvOb8E",
    });

    let parameter = {
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: 100000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "Izzi",
        last_name: "Akbar",
        email: "izaaz240@gmail.com",
        phone: "088220131688",
      },
    };

    let url
    await snap.createTransaction(parameter).then((transaction) => {
      let transactionToken = transaction.token;
      url = transaction.redirect_url;
      console.log(transactionToken);
    });
    res.status(200).json({ message: "success", url: url });
  }
}
