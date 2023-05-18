import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const dataToUpload = JSON.parse(req.body);

    const { data, error } = await supabase
      .from("Brand")
      .insert([{ name: dataToUpload.name }]);

    if (!error) res.status(200).json(data);
    else res.status(500).json(error.message);
  } else {
    res.status(200).json({ message: "GET or PUT or DELETE" });
  }
}
