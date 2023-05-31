import { SellerCar } from "@/models/seller/SellerCars";
import { Seller } from "@/models/seller/Sellers";
import { useUser } from "@supabase/auth-helpers-react";

export default function Car({ carData, sellerData }) {
  const user = useUser();
  if (!user) return <h1 className=" text-3xl text-center">Login Please</h1>;
  if (!carData) return <h1 className=" text-3xl text-center">No Data</h1>;
  return (
    <div className=" mx-3">
      <p>{carData.carMake}</p>
      <p>{carData.carModel}</p>
      <p>{sellerData.sellerName}</p>
      <p>{sellerData.email}</p>
      <button className=" bg-cyan-300 px-3 rounded-xl">Buy</button>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { carId: _id } = ctx.query;

  const carDetail = await SellerCar.findOne({ _id: _id });
  const carData = JSON.parse(JSON.stringify(carDetail));

  if (!carDetail) return { props: { carData: null, sellerData: null } };

  const sellerDetail = await Seller.findOne({ sellerId: carData.sellerId });
  const sellerData = JSON.parse(JSON.stringify(sellerDetail));

  return {
    props: {
      carData,
      sellerData,
    },
  };
}
