import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const dataToUpload = JSON.parse(req.body);

    // insert new car brand
    const { error } = await supabase
      .from("Brand")
      .insert([{ name: dataToUpload.name }]);

    // return response
    if (!error) res.status(200).json({ message: "success" });
    else res.status(500).json(error);
  } else {
    res.status(200).json({ message: "other method" });
  }
}
