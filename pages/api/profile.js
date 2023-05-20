import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // insert a new profile

    let dataToUpload;
    try {
      dataToUpload = JSON.parse(req.body);
    } catch (error) {
      dataToUpload = req.body;
    }
    console.log(dataToUpload);

    // insert a new profile
    const { error } = await supabase.from("Profile").insert([dataToUpload]);

    // return response
    if (!error) res.status(200).json({ message: "success" });
    else res.status(500).json(error);
  } else if (req.method === "PUT") {
    // updating user data

    let dataToUpload;
    try {
      dataToUpload = JSON.parse(req.body);
    } catch (error) {
      dataToUpload = req.body;
    }
    console.log(dataToUpload);

    if ("balance" in dataToUpload) {
      // get the current balance
      const { data: balance } = await supabase
        .from("Profile")
        .select("balance")
        .eq("email", dataToUpload.email);

      // add the balance
      dataToUpload.balance = String(
        Number(dataToUpload.balance) + balance[0].balance
      );
    }

    // update the data
    const { error } = await supabase
      .from("Profile")
      .update(dataToUpload)
      .eq("email", dataToUpload.email);

    // return response
    if (!error) {
      res.status(200).json({ message: "success" });
    } else res.status(500).json(error);
  } else {
    res.status(200).json({ message: "other method" });
  }
}
