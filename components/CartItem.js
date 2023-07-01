import veggie from "../public/veggie.jpeg";
import Image from "next/image";

export default function CartItem({ item }) {
  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify(item),
    });
    const res = await response.json();
    console.log(response.status);
    console.log(res);

    if (response.status === 200) alert("success");
    else alert("failed");

    window.location.reload();
  };
  return (
    <>
      <div className=" rounded-lg mx-1 my-1 bg-slate-300 ">
        <div className="">
          <Image
            className=" w-full aspect-square object-cover rounded-lg"
            alt="car"
            src={veggie}
          />
        </div>
        <div className=" ml-2 pb-2">
          <h1 className=" text-xl">{item.productName}</h1>
          <h1 className=" text-2xl">{item.brand}</h1>
          <p>Price: {item.price} USD</p>
        </div>
        <button
          onClick={handleDelete}
          className=" bg-red-300 hover:bg-red-400 rounded-b-lg px-2 mt-2 w-full"
        >
          Delete
        </button>
      </div>
    </>
  );
}
