import { Inter } from "next/font/google";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <div>
          <p>Logged In</p>
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
