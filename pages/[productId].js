import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { dbConnect } from "@/lib/dbConnect";
import Image from "next/image";
import veggie from "../public/veggie.jpeg";
import { Customer } from "@/models/customers";
import { Product } from "@/models/product";
import { Department } from "@/models/department";
import { Supplier } from "@/models/suppliers";

export default function ProductDetail({
  department,
  product,
  supplier,
  customer,
}) {
  const user = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cartItem = {
      email: user.email,
      product_id: product._id,
    };

    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(cartItem),
    });
    const res = await response.json();
    console.log(response.status);
    console.log(res);

    if (response.status === 200) alert("success");
    else alert("failed");
  };

  if (!user) return <h1 className=" text-3xl text-center">Login Please</h1>;
  else
    return (
      <div className=" mt-5 flex flex-col items-center">
        <div className=" border-solid border-2 border-black-300 rounded-lg w-1/2 grid grid-cols-2 gap-3">
          <Image
            src={veggie}
            alt="veggie picture"
            className=" aspect-square object-cover rounded-tl-lg"
          />
          <div>
            <h1 className=" text-2xl">Product Detail</h1>
            <p>Product Name: {product.productName} </p>
            <p>Brand: {product.brand} </p>
            <p>Price: {product.price} USD</p>
            <p>Department: {department.departmentName} </p>
            <p>Supplier: {supplier.supplier_name} </p>
          </div>

          <div className=" w-full  col-span-2 ">
            {!customer ? (
              <p className="">Complete Profile Before Buying</p>
            ) : (
              <button
                onClick={handleSubmit}
                className=" w-full rounded-b-lg px-2 py-1 bg-cyan-400 "
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
}

export async function getServerSideProps(ctx) {
  const { productId: _id } = ctx.query;
  const supabase = createServerSupabaseClient(ctx);
  await dbConnect();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      props: {
        department: null,
        product: null,
        supplier: null,
        customer: null,
      },
    };

  const customerData = await Customer.findOne({ email: session.user.email });
  const customer = JSON.parse(JSON.stringify(customerData));

  const productData = await Product.findById(_id);
  const product = JSON.parse(JSON.stringify(productData));

  const departmentData = await Department.findOne({
    departmentName: product.department,
  });
  const department = JSON.parse(JSON.stringify(departmentData));
  console.log(department);

  const supplierData = await Supplier.findOne({
    supplier_name: product.supplier,
  });
  const supplier = JSON.parse(JSON.stringify(supplierData));
  console.log(supplier);

  return {
    props: { department, product, supplier, customer },
  };
}
