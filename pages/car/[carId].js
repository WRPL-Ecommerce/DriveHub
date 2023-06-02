import { SellerCar } from "@/models/seller/SellerCars";
import { Seller } from "@/models/seller/Sellers";
import { Shipper } from "@/models/shipper/Shippers";
import { Supplier } from "@/models/supplier/Suppliers";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Car({
  carData,
  sellerData,
  supplierData,
  shipperList,
}) {
  const user = useUser();
  const { push } = useRouter();

  async function handlePayment() {
    const response = await fetch("/api/midtrans", {
      method: "POST",
      body: {},
    });
    console.log(response);
    const res = await response.json();
    push(res.url);
  }

  if (!user) return <h1 className=" text-3xl text-center">Login Please</h1>;
  if (!carData) return <h1 className=" text-3xl text-center">No Data</h1>;
  return (
    <div className=" mx-3">
      <p>{carData.carMake}</p>
      <p>{carData.carModel}</p>
      <p>{carData.year}</p>
      <p>{carData.price}</p>

      <p>{sellerData.sellerName}</p>
      <p>{sellerData.email}</p>
      <p>{sellerData.contactNumber}</p>
      <p>{sellerData.address}</p>

      <p>{supplierData.supplierName}</p>
      <p>{supplierData.address}</p>
      <p>{supplierData.email}</p>
      <p>{supplierData.contactNumber}</p>

      {shipperList.map((shipper) => (
        <p key={shipper._id}>{shipper.shipperName}</p>
      ))}

      <button
        onClick={handlePayment}
        className=" bg-cyan-300 hover:bg-cyan-400 px-3 rounded-xl"
      >
        Buy
      </button>
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
