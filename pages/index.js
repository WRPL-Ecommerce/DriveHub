import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import Image from "next/image";
import car from "../public/car3.png";
import cars from "../public/car2.jpeg";
import carss from "../public/sienta.jpeg";

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
        <>
          <div className="hero">
            <h2>Welcome to Drive Hub</h2>
            <h1>Looking for Cars?</h1>

            <p> You have come to the right place. </p>
            <p>
              Whether you are in the market for a new or used car, weve get you
              covered
            </p>
            <div id="display"></div>
          </div>

          <div className="thumbnail">
            <h2>Choose your preference!</h2>
            <p>
              Our extensive selection of vehicles includes popular brands and
              models
            </p>
            <p>from top brands, all at competitive prices</p>
          </div>

          <section className="cars">
            <ul>
              <li>
                <div className="gambar1">
                  <Image
                    src={car}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  />
                </div>
              </li>
              <li>
                <div className="gambar2">
                  <Image
                    src={cars}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  />
                </div>
              </li>
              <li>
                <div className="gambar3">
                  <Image
                    src={carss}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  />
                </div>
              </li>
            </ul>
          </section>

          <section className="sellCar">
            <h2>Stay Tune for Updated Info</h2>
            <ul>
              <li>
                <a
                  href="mailto:william.hilmy.susatyo@mail.ugm.ac.id"
                  target="_blank"
                >
                  <Image
                    src="/gmail.png"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=6282120717659&text&type=phone_number&app_absent=0"
                  target="_blank"
                >
                  <Image
                    src="/whatsapp.png"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                  />
                </a>
              </li>
            </ul>
          </section>

          <footer>
            <p> 2023 Car Selling Website. All rights reserved.</p>
          </footer>
        </>
      )}
    </>
  );
}
