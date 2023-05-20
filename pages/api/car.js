import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // insert new car to be sold

    // input example
    // {
    //     email: user email,
    //     brand: car brand,
    //     model: car model,
    //     year: year released,
    //     kilometers: kilometers in car,
    //     engineType: engine type,
    //     transmissionType: transmission type,
    //     price: car price,
    //     description: give good description
    // }

    let dataToUpload;
    try {
      dataToUpload = JSON.parse(req.body);
    } catch (e) {
      dataToUpload = req.body;
    }
    console.log(dataToUpload);

    // get seller id
    const { data: sellerId } = await supabase
      .from("Profile")
      .select("user_id")
      .eq("email", dataToUpload.email);
    console.log(sellerId); // array

    // get model and brand id
    const { data: modelAndBrand } = await supabase
      .from("Model")
      .select("model_id,brand_id")
      .ilike("name", `%${dataToUpload.model}%`);
    console.log(modelAndBrand); // array

    // if model not found, input the model
    if (modelAndBrand.length === 0) {
      // input the model
      const response = await fetch("http://localhost:3000/api/model", {
        method: "POST",
        body: JSON.stringify({
          name: dataToUpload.model,
          brand: dataToUpload.brand,
        }),
      });
      const responseData = await response.json();
      console.log(response.status);
      console.log(responseData);

      // get the model and brand id
      const { data: newModelAndBrand } = await supabase
        .from("Model")
        .select("model_id,brand_id")
        .ilike("name", `%${dataToUpload.model}%`);
      console.log(newModelAndBrand);

      // insert the data to table
      const { error: insertError } = await supabase.from("Car").insert([
        {
          seller_id: sellerId[0].user_id,
          brand_id: newModelAndBrand[0].brand_id,
          model_id: newModelAndBrand[0].model_id,
          year: dataToUpload.year,
          kilometers: dataToUpload.kilometers,
          engine_type: dataToUpload.engineType,
          transmission_type: dataToUpload.transmissionType,
          price: dataToUpload.price,
          description: dataToUpload.description,
        },
      ]);
      console.log(insertError);

      if (response.status !== 500 && !insertError)
        res.status(200).json({ message: "success" });
      else res.status(500).json({ responseData, insertError });
    }
    // model found
    else {
      // insert the data to table
      const { error: insertError } = await supabase.from("Car").insert([
        {
          seller_id: sellerId[0].user_id,
          brand_id: modelAndBrand[0].brand_id,
          model_id: modelAndBrand[0].model_id,
          year: dataToUpload.year,
          kilometers: dataToUpload.kilometers,
          engine_type: dataToUpload.engineType,
          transmission_type: dataToUpload.transmissionType,
          price: dataToUpload.price,
          description: dataToUpload.description,
        },
      ]);
      console.log(insertError);

      if (!insertError) res.status(200).json({ message: "success" });
      else res.status(500).json(insertError);
    }
  } else if (req.method === "PUT") {
    // update information of a car
    res.status(200).json({ message: "other method" });
  } else if (req.method === "DELETE") {
    // delete a car from record
    res.status(200).json({ message: "other method" });
  } else {
    res.status(200).json({ message: "other method" });
  }
}
