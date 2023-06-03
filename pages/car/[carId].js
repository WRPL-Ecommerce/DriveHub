import { SellerCar } from "@/models/seller/SellerCars";
import { Seller } from "@/models/seller/Sellers";
import { Shipper } from "@/models/shipper/Shippers";
import { Supplier } from "@/models/supplier/Suppliers";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import car from "/public/car3.jpeg";

export default function Car({
  carData,
  sellerData,
  supplierData,
  shipperList,
}) {
  const user = useUser();

  async function handlePayment(e) {
    e.preventDefault();
    const response = await fetch("/api/midtrans", {
      method: "POST",
      body: {},
    });
    console.log(response);
    const res = await response.json();
    window.open(res.url, "_blank");
  }

  if (!user) return <h1 className=" text-3xl text-center">Login Please</h1>;
  if (!carData) return <h1 className=" text-3xl text-center">No Data</h1>;
  return (
    <div className=" mt-5 flex flex-col items-center">
      <div className=" border-solid border-2 border-black-300 rounded-lg w-1/2 grid grid-cols-2 gap-3">
        <Image
          src={car}
          alt="car picture"
          className=" aspect-square object-cover rounded-tl-lg"
        />
        <div>
          <h1 className=" text-2xl">Car Detail</h1>
          <p>Car Brand: {carData.carMake}</p>
          <p>Car Model: {carData.carModel}</p>
          <p>Year: {carData.year}</p>
          <p>Price: {carData.price} USD</p>
        </div>

        <div>
          <h1 className=" text-2xl">Seller</h1>
          <p>Name: {sellerData.sellerName}</p>
          <p>Email: {sellerData.email}</p>
          <p>Phone: {sellerData.contactNumber}</p>
          <p>Address: {sellerData.address}</p>
        </div>

        <div>
          <h1 className=" text-2xl">Supplier Detail</h1>
          <p>{supplierData.supplierName}</p>
          <p>{supplierData.address}</p>
          <p>{supplierData.email}</p>
          <p>{supplierData.contactNumber}</p>
        </div>

        <form
          className=" col-span-2 flex flex-col items-center"
          onSubmit={handlePayment}
        >
          <h1 className=" text-2xl mb-2">Pick Shipper Company</h1>
          {shipperList.map((shipper) => (
            <div key={shipper._id}>
              <input
                id={shipper.shipperName}
                name="shipper"
                value={shipper.shipperName}
                type="radio"
              />
              <label>{shipper.shipperName}</label>
            </div>
          ))}
          <button
            onClick={handlePayment}
            className=" w-full bg-cyan-300 hover:bg-cyan-400 px-3 rounded-lg mt-3"
          >
            Buy Now
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { carId: _id } = ctx.query;

  const carDetail = await SellerCar.findOne({ _id: _id });
  const carData = JSON.parse(JSON.stringify(carDetail));

  if (!carDetail) return { props: { carData: null, sellerData: null } };

  const sellerDetail = await Seller.findOne({ sellerId: carData.sellerId });
  const sellerData = JSON.parse(JSON.stringify(sellerDetail));

  const supplierDetail = await Supplier.findOne({ _id: sellerData.supplier });
  const supplierData = JSON.parse(JSON.stringify(supplierDetail));

  const shipperDetail = await Shipper.find({});
  const shipperList = JSON.parse(JSON.stringify(shipperDetail));

  return {
    props: {
      carData,
      sellerData,
      supplierData,
      shipperList,
    },
  };
}
