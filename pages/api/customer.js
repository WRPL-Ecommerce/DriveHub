import { Customer } from "@/models/customers";

export default async function handler(req, res) {
  if (req.method !== "POST") res.status(200).json({ message: "Other method" });
  else {
    let data;
    try {
      data = JSON.parse(req.body);
    } catch (err) {
      data = req.body;
    }
    console.log(data);

    try {
      await Customer.create(data);
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
