import { Cart } from "@/models/cart";

export default async function handler(req, res) {
  let data;
  try {
    data = JSON.parse(req.body);
  } catch (error) {
    data = req.body;
  }
  console.log(data);
  if (req.method === "POST") {
    try {
      await Cart.create(data);
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else if (req.method === "PUT") {
    try {
      await Cart.deleteOne({ product_id: data._id });
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else res.status(200).json({ message: "other method" });
}
