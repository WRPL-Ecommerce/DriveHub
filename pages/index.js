import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { SellerCar } from "@/models/seller/SellerCars";
import dbConnect from "@/lib/dbConnect";
import Card from "@/components/Card";

export default function Home({ data }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <>
      {!session ? (
        <div className="flex flex-col items-center">
          <h1 className=" text-4xl">Login</h1>
          <div className=" w-1/2 items-center ">
            <Auth supabaseClient={supabase} />
          </div>
        </div>
      ) : (
        <div className=" w-full">
          <div className=" grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {data.map((carData) => (
              <Card key={carData._id} carData={carData} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  dbConnect();
  const carList = await SellerCar.find({});
  const data = JSON.parse(JSON.stringify(carList));

  return {
    props: {
      data,
    },
  };
}
