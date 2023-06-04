import Card from "@/components/Card";
import dbConnect from "@/lib/dbConnect";
import { SellerCar } from "@/models/seller/SellerCars";
import { useUser } from "@supabase/auth-helpers-react";

export default function Car({ data }) {
  const user = useUser();
  return (
    <>
      {user ? (
        <div className=" w-full">
          <div className=" grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {data.map((carData) => (
              <Card key={carData._id} carData={carData} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className=" text-center">Login Please</h1>
      )}
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const carList = await SellerCar.find({});
  const data = JSON.parse(JSON.stringify(carList));

  return {
    props: {
      data,
    },
  };
}
