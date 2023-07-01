import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import CustomerInsert from "@/components/customerInsert";
import { Customer } from "@/models/customers";
import Image from "next/image";
import profile from "../public/profile.jpeg";

export default function Profile({ customer }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { push } = useRouter();

  if (!user) return <h1 className=" text-3xl text-center">Login Please</h1>;
  else if (!customer) return <CustomerInsert />;
  else
    return (
      <div>
        <h1 className=" text-3xl text-center">Profile</h1>
        <div className=" mt-5 flex flex-col items-center">
          <div className=" border-solid border-2 border-black-300 rounded-lg w-1/2 grid grid-cols-2 gap-3">
            <Image
              src={profile}
              alt="profile picture"
              className=" aspect-square object-cover rounded-tl-lg"
            />
            <div>
              <h1 className=" text-2xl">Profile Detail</h1>
              <p>Name: {customer.contact_name} </p>
              <p>Company: {customer.company}</p>
              <p>Country/Region: {customer.country_region}</p>
              <p>E-mail: {customer.email}</p>
            </div>
          </div>
        </div>
        <button
          className=" bg-cyan-400 rounded-md px-2 py-1"
          onClick={() => {
            supabase.auth.signOut();
            push("/");
          }}
        >
          Sign Out
        </button>
      </div>
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
        customer: null,
      },
    };
  }

  const customerData = await Customer.findOne({ email: session.user.email });
  const customer = JSON.parse(JSON.stringify(customerData));
  console.log(customer);

  return {
    props: { customer },
  };
}
