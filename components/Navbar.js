import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function Navbar() {
  const user = useUser();
  const array1 = ["Car", "About", "Profile"];
  const array2 = ["About"];

  return (
    <>
      <div className=" bg-gradient-to-r from-orange-400 to-purple-200">
        <div className=" flex justify-between mx-2 py-2 ">
          <Link className=" text-3xl hover:text-cyan-300" href={`/`}>
            DriveHub
          </Link>
          <ul className=" flex items-center">
            {user
              ? array1.map((link, idx) => {
                  return (
                    <li key={idx} className=" mx-4 hover:text-cyan-300">
                      <Link href={`/${link.toLowerCase()}`}>{link}</Link>
                    </li>
                  );
                })
              : array2.map((link, idx) => {
                  return (
                    <li key={idx} className=" mx-4 hover:text-cyan-300">
                      <Link href={`/${link.toLowerCase()}`}>{link}</Link>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </>
  );
}
