import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/product";
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
        <>
          <div className=" w-full">
            <div className=" grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {data.map((product) => (
                <Card key={product._id} productData={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const productList = await Product.find({});
  const data = JSON.parse(JSON.stringify(productList));

  return {
    props: {
      data,
    },
  };
}
