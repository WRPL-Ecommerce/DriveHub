import BuyerInsert from "@/components/buyerForm/buyerInsert";
import { Buyer } from "@/models/buyer/Buyers";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Profile({ data }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { push } = useRouter();
  return (
    <>
      {!user ? (
        <p>no user</p>
      ) : data ? (
        <div>
          <h1>Profile Complete</h1>
          <button
            onClick={() => {
              supabase.auth.signOut();
              push("/");
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <BuyerInsert />
          <button
            onClick={() => {
              supabase.auth.signOut();
              push("/");
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      props: {
        email: [],
      },
    };
  } else {
    const buyer = await Buyer.findOne({ email: session.user.email });
    const buyerData = JSON.parse(JSON.stringify(buyer));
    console.log(buyerData);

    return {
      props: {
        data: buyerData,
      },
    };
  }
}
