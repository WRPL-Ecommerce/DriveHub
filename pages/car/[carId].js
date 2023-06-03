import { SellerCar } from "@/models/seller/SellerCars";
import { Seller } from "@/models/seller/Sellers";
import { Shipper } from "@/models/shipper/Shippers";
import { Supplier } from "@/models/supplier/Suppliers";
import { useUser } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import car from "/public/car3.jpeg";
import { Buyer } from "@/models/buyer/Buyers";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Car({
  carData,
  sellerData,
  supplierData,
  shipperList,
  buyerData,
}) {
  const user = useUser();

  async function handlePayment(e) {
    e.preventDefault();

    const transaction_details = {
      order_id: uuidv4(),
      gross_amount: carData.price,
    };

    const credit_card = {
      secure: true,
    };

    const customer_details = {
      first_name: buyerData.buyerName,
      email: user.email,
      phone: buyerData.contactNumber,
      shipping_address: {
        first_name: buyerData.buyerName,
        email: user.email,
        phone: buyerData.contactNumber,
        address: buyerData.address,
      },
    };

    const item_details = {
      id: carData._id,
      price: carData.price,
      quantity: 1,
      name: `${carData.carMake} ${carData.carModel}`,
    };

    const response = await fetch("/api/midtrans", {
      method: "POST",
      body: JSON.stringify({
        transaction_details,
        credit_card,
        customer_details,
        item_details,
      }),
    });
    console.log(response.status);
    const res = await response.json();
    console.log(res);
    window.open(res.url, "_blank");
    window.location.reload();
  }

  if (!user) return <h1 className=" text-3xl text-center">Login Please</h1>;
  if (!carData) return <h1 className=" text-3xl text-center">No Data</h1>;
  if (!buyerData)
    return (
      <h1 className=" text-3xl text-center">
        Complete User Information in Profile Page Please
      </h1>
    );
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
          <p>Name: {supplierData.supplierName}</p>
          <p>Address: {supplierData.address}</p>
          <p>Email: {supplierData.email}</p>
          <p>Phone: {supplierData.contactNumber}</p>
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
                required
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
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      props: {
        carData: null,
        sellerData: null,
        supplierData: null,
        shipperList: null,
        buyerData: null,
      },
    };

  const carDetail = await SellerCar.findOne({ _id: _id });
  const carData = JSON.parse(JSON.stringify(carDetail));

  if (!carDetail) return { props: { carData: null, sellerData: null } };

  const sellerDetail = await Seller.findOne({ sellerId: carData.sellerId });
  const sellerData = JSON.parse(JSON.stringify(sellerDetail));

  const supplierDetail = await Supplier.findOne({ _id: sellerData.supplier });
  const supplierData = JSON.parse(JSON.stringify(supplierDetail));

  const shipperDetail = await Shipper.find({});
  const shipperList = JSON.parse(JSON.stringify(shipperDetail));

  const buyerDetail = await Buyer.findOne({ email: session.user.email });
  const buyerData = JSON.parse(JSON.stringify(buyerDetail));

  return {
    props: {
      carData,
      sellerData,
      supplierData,
      shipperList,
      buyerData,
    },
  };
}
