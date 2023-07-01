import Image from "next/image";
import veggie from "../public/veggie.jpeg";
import { useRouter } from "next/router";

export default function Card({ productData }) {
  const { push } = useRouter();
  return (
    <div className=" rounded-lg mx-1 my-1 bg-slate-300 ">
      <div className="">
        <Image
          className=" w-full aspect-square object-cover rounded-lg"
          alt="car"
          src={veggie}
        />
      </div>
      <div className=" ml-2 pb-2">
        <h1 className=" text-xl">{productData.productName}</h1>
        <h1 className=" text-2xl">{productData.brand}</h1>
        <p>Price: {productData.price} USD</p>
      </div>
      <button
        onClick={() => {
          push(`/${productData._id}`);
        }}
        className=" bg-sky-300 hover:bg-sky-400 rounded-b-lg px-2 mt-2 w-full"
      >
        Detail
      </button>
    </div>
  );
}
