import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import Image from "next/image";
import car from "../public/car3.png";
import gmail from "../public/gmail.png";
import whatsapp from "../public/whatsapp.png";
import cars from "../public/car2.jpeg";
import carss from "../public/sienta.jpeg";
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
        <>
          <div class="hero">
            <h2>Welcome to Drive Hub</h2>
            <h1>Looking for Cars?</h1>

            <p> You have come to the right place. </p>
            <p>
              Whether you are in the market for a new or used car, weve get you
              covered
            </p>
            <div id="display"></div>
          </div>

          <div class="thumbnail">
            <h2>Choose your preference!</h2>
            <p>
              Our extensive selection of vehicles includes popular brands and
              models
            </p>
            <p>from top brands, all at competitive prices</p>
          </div>

          <section class="cars">
            <ul>
              <li>
                <div class="gambar1">
                  <Image
                    src={car}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  />
                </div>
              </li>
              <li>
                <div class="gambar2">
                  <Image
                    src={cars}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                  />
                </div>
              </li>
              <li>
                <div class="gambar3">
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

          <section class="sellCar">
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

          <div className=" w-full">
            <div className=" grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {data.map((carData) => (
                <Card key={carData._id} carData={carData} />
              ))}
            </div>
          </div>

          <footer>
            <p> 2023 Car Selling Website. All rights reserved.</p>
          </footer>

          <button
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Sign Out
          </button>
        </>
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
