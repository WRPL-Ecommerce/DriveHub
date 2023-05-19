import ProfileForm from "@/components/form/profileForm";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

export default function Profile({ email }) {
  const user = useUser();
  return (
    <>
      {!user ? (
        <p>no user</p>
      ) : email.length > 0 ? (
        <p>update data</p>
      ) : (
        <ProfileForm />
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
    const { data: email } = await supabase
      .from("Profile")
      .select("email")
      .eq("email", "t");

    return {
      props: {
        email: email,
      },
    };
  }
}
