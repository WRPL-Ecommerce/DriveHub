import { dbConnect } from "@/lib/dbConnect";
import { useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Cart } from "@/models/cart";
import { Product } from "@/models/product";
import CartItem from "@/components/CartItem";
import { v4 as uuidv4 } from "uuid";
import { Customer } from "@/models/customers";

export default function CartPage({ data: items, customer }) {
  const user = useUser();
  const handleCheckOut = async (e) => {
    e.preventDefault();

    let gross_amount = 0;
    items.forEach((item) => {
      gross_amount += item.price;
    });

    const transaction_details = {
      order_id: uuidv4(),
      gross_amount: gross_amount,
    };

    const credit_card = {
      secure: true,
    };

    const customer_details = {
      first_name: customer.contact_name,
      email: user.email,
    };

    const item_details = [];
    items.forEach((item) => {
      item_details.push({
        id: item._id,
        price: item.price,
        quantity: 1,
        name: item.productName,
      });
    });

    const response = await fetch("/api/midtrans", {
      method: "POST",
      body: JSON.stringify({
        transaction_details,
        credit_card,
        customer_details,
        item_details,
      }),
    });
    const res = await response.json();
    console.log(response.status);
    console.log(res);
    window.open(res.url, "_blank");
    window.location.reload();
  };
  if (!user) return <h1 className=" text-center">Login Please</h1>;
  else
    return (
      <>
        <h1>Cart</h1>
        <div className=" w-full">
          <div className=" grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </div>
        {items ? (
          <button
            onClick={handleCheckOut}
            className=" bg-cyan-400 px-2 py-1 rounded-md"
          >
            Check Out
          </button>
        ) : (
          <div></div>
        )}
      </>
    );
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      props: {
        data: null,
      },
    };

  await dbConnect();
  const productList = await Cart.find({ email: session.user.email }).exec();
  console.log(productList);

  const items = [];

  for (const product of productList) {
    const item = await Product.findById(product.product_id);
    const itemData = JSON.parse(JSON.stringify(item));
    items.push(itemData);
  }
  console.log(items);

  const customerData = await Customer.findOne({ email: session.user.email });
  const customer = JSON.parse(JSON.stringify(customerData));

  return {
    props: {
      data: items,
      customer,
    },
  };
}
