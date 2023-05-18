import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // updating user data
    const dataToUpload = JSON.parse(req.body);
    console.log(dataToUpload);

    // check if profile already exist
    const { data, error } = await supabase
      .from("Profile")
      .select("user_id")
      .eq("email", dataToUpload.email);
    console.log(data);

    if (data.length > 0) {
      // profile exist

      // update an existing profile
      const { data, error } = await supabase
        .from("Profile")
        .update(dataToUpload)
        .eq("email", dataToUpload.email);

      if (!error) res.status(200).json(data);
      else res.status(500).json(error);
    } else {
      // profile does not exist yet

      // insert a new profile
      const { data: user, error } = await supabase
        .from("Profile")
        .insert([dataToUpload]);

      if (!error) res.status(200).json(data);
      else res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    // updating user balance

    const dataToUpload = JSON.parse(req.body);
    console.log(dataToUpload);

    // get the current balance
    const { data: balance, error } = await supabase
      .from("Profile")
      .select("balance")
      .eq("email", dataToUpload.email);

    // add the balance
    dataToUpload.balance = String(
      Number(dataToUpload.balance) + balance[0].balance
    );

    // update the balance
    const { data, err } = await supabase
      .from("Profile")
      .update(dataToUpload)
      .eq("email", dataToUpload.email);

    if (!error && !err) {
      res.status(200).json({ message: "success" });
    } else res.status(500).json({ error: error, err: err });
  } else {
    res.status(200).json({ message: "other method" });
  }
}
