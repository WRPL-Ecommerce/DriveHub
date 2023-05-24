import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // parse input data

    // input example
    // {
    //   name: model name,
    //   brand: brand name
    // }

    let dataToUpload;
    try {
      dataToUpload = JSON.parse(req.body);
    } catch (e) {
      dataToUpload = req.body;
    }
    console.log(dataToUpload);

    // check if the brand exist already
    const { data: brandId } = await supabase
      .from("Brand")
      .select("brand_id")
      .ilike("name", `%${dataToUpload.brand}%`);
    console.log(brandId);

    if (brandId.length > 0) {
      // brand exist

      // input new model
      const { error } = await supabase
        .from("Model")
        .insert([{ name: dataToUpload.name, brand_id: brandId[0].brand_id }]);
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
      const responseData = await response.json();
      console.log(response.status);
      console.log(responseData);

      // get the brand id
      const { data: newBrandId } = await supabase
        .from("Brand")
        .select("brand_id")
        .ilike("name", `%${dataToUpload.brand}%`);
      console.log(newBrandId);

      // input new model
      const { error: model_error } = await supabase
        .from("Model")
        .insert([
          { name: dataToUpload.name, brand_id: newBrandId[0].brand_id },
        ]);
      console.log(model_error);

      // return response
      if (!model_error && response.status !== 500)
        res.status(200).json({ message: "success" });
      else
        res.status(500).json({
          responseData,
          model_error,
        });
    }
  } else res.status(200).json({ message: "other method" });
}
