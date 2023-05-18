import { supabase } from "@/lib/supabaseClient";

// The http method may have been used slightly incorrectly, bear with it
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
      const { error } = await supabase
        .from("Profile")
        .update(dataToUpload)
        .eq("email", dataToUpload.email);

      if (!error) res.status(200).json({ message: "success" });
      else res.status(500).json(error);
    } else {
      // profile does not exist yet

      // insert a new profile
      const { error } = await supabase.from("Profile").insert([dataToUpload]);

      // return response
      if (!error) res.status(200).json({ message: "success" });
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
    const { error: err } = await supabase
      .from("Profile")
      .update(dataToUpload)
      .eq("email", dataToUpload.email);

    // return response
    if (!error && !err) {
      res.status(200).json({ message: "success" });
    } else res.status(500).json({ error1: error, error2: err });
  } else {
    res.status(200).json({ message: "other method" });
  }
}
