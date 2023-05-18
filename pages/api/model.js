import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // parse input data
    const dataToUpload = JSON.parse(req.body);
    console.log(dataToUpload.brand);

    // check if the brand exist already
    const { data: brand_id, error } = await supabase
      .from("Brand")
      .select("brand_id")
      .ilike("name", `%${dataToUpload.brand}%`);
    console.log(brand_id, error);

    if (brand_id.length > 0) {
      // brand exist

      // input new model
      const { error } = await supabase
        .from("Model")
        .insert([{ name: dataToUpload.name, brand_id: brand_id[0].brand_id }]);
      console.log(error);

      if (!error) res.status(200).json({ message: "success" });
      else res.status(500).json(error);
    } else {
      // brand does not exist

      // input new brand
      const response = await fetch("http://localhost:3000/api/brand", {
        method: "POST",
        body: JSON.stringify({
          name: dataToUpload.brand,
        }),
      });
      const responseJSON = await response.json();
      console.log(response.status);
      console.log(responseJSON);

      // get the brand id
      const { data: new_brand_id, error: brand_id_error } = await supabase
        .from("Brand")
        .select("brand_id")
        .ilike("name", `%${dataToUpload.brand}%`);
      console.log(brand_id_error);

      // input new model
      const { error: model_error } = await supabase
        .from("Model")
        .insert([
          { name: dataToUpload.name, brand_id: new_brand_id[0].brand_id },
        ]);
      console.log(model_error);

      // return response
      if (!brand_id_error && !model_error && response.status !== 500)
        res.status(200).json({ message: "success" });
      else
        res.status(500).json({
          error1: responseJSON,
          error2: brand_id_error,
          error3: model_error,
        });
    }
  } else res.status(200).json({ message: "other method" });
}
