import ProfileInsert from "@/components/profileForm/profileInsert";
import ProfileUpdate from "@/components/profileForm/profileUpdate";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Profile({ data }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  return (
    <>
      {!user ? (
        <p>no user</p>
      ) : data.length > 0 ? (
        <div>
          <ProfileUpdate />
          <button
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <ProfileInsert />
          <button
            onClick={() => {
              supabase.auth.signOut();
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
    const { data } = await supabase
      .from("Profile")
      .select("*")
      .eq("email", session.user.email);
    console.log(data);

    return {
      props: {
        data: data,
      },
    };
  }
}
