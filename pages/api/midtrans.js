import Midtrans from "midtrans-client";

export default async function handler(req, res) {
  if (req.method !== "POST") res.status(200).json({ message: "other method" });
  else {
    let data;
    try {
      data = JSON.parse(req.body);
    } catch (error) {
      data = req.body;
    }
    console.log(data);

    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY,
    });

    let url;
    await snap.createTransaction(data).then((transaction) => {
      let transactionToken = transaction.token;
      url = transaction.redirect_url;
      console.log(transactionToken);
    });
    res.status(200).json({ message: "success", url: url });
  }
}
