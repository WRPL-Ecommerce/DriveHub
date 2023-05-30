import Image from "next/image";
import car from "../public/car3.jpeg";
import { useRouter } from "next/router";

export default function Card({ carData }) {
  const { push } = useRouter();
  return (
    <div className=" rounded-lg w-full mx-1 my-1 bg-slate-300 ">
      <div className="">
        <Image
          className=" aspect-square object-cover rounded-lg"
          alt="car"
          src={car}
        />
      </div>
      <div className=" ml-2 pb-2">
        <h1 className=" text-xl">{carData.carMake}</h1>
        <h1 className=" text-2xl">{carData.carModel}</h1>
        <p>Year: {carData.year}</p>
        <p>Price: {carData.price} USD</p>
        <button
          onClick={() => {
            push(`/car/${carData.carId}`);
          }}
          className=" bg-sky-300 rounded-xl px-2 mt-2"
        >
          Detail
        </button>
      </div>
    </div>
  );
}
