import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const dataToUpload = JSON.parse(req.body);
    console.log(dataToUpload);

    const { data, error } = await supabase
      .from("Profile")
      .select("user_id")
      .eq("email", dataToUpload.email);
    console.log(data);

    if (data.length > 0) {
      console.log("there is a profile");

      const { data, error } = await supabase
        .from("Profile")
        .update(dataToUpload)
        .eq("email", dataToUpload.email);

      if (!error) res.status(200).json(data);
      else res.status(500).json(error);
    } else {
      const { data: user, error } = await supabase
        .from("Profile")
        .insert([dataToUpload]);
      if (!error) res.status(200).json(data);
      else res.status(500).json(error);
    }
  } else {
    res.status(200).json({ message: "other method" });
  }
}
