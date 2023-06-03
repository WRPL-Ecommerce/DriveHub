import { useUser } from "@supabase/auth-helpers-react";

export default function BuyerInsert() {
  const user = useUser();
  async function handleSubmit(e) {
    e.preventDefault();
    const buyer = {
      buyerName: e.target.fullName.value,
      contactNumber: e.target.phone.value,
      email: user.email,
      address: e.target.address.value,
    };
    console.log(buyer)

    const buyerPreference = {
      carMake: e.target.carMake.value,
      carModel: e.target.carModel.value,
      maximumPrice: e.target.maximumPrice.value,
    };

    const bankAccount = {
      accountNumber: e.target.accountNumber.value,
      bankName: e.target.bankName.value,
      accountHolderName: e.target.fullName.value,
      balance: e.target.balance.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };

    const response = await fetch("/api/buyer", {
      method: "POST",
      body: JSON.stringify({ buyer, buyerPreference, bankAccount }),
    });
    const responseData = await response.json();
    console.log(response.status);
    console.log(responseData);

    if (response.status === 200) alert("success");
    else alert("failed");
    window.location.reload();
  }

  return (
    <>
      <h1 className=" text-center">Complete Information</h1>
      <form className="flex flex-col items-center my-5" onSubmit={handleSubmit}>
        <h1 className=" text-4xl my-5">Personal Data</h1>
        <div className=" grid grid-cols-2 text-center">
          <label className=" my-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="fullName"
            name="fullName"
            required
          />

          <label className=" my-2" htmlFor="email">
            Email
          </label>
          <input
            className=" my-2"
            type="text"
            id="email"
            name="email"
            disabled
            value={user.email}
          />
          <label className=" my-2" htmlFor="phone">
            Phone
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="phone"
            name="phone"
            required
          />

          <label className=" my-2" htmlFor="phone">
            Address
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="address"
            name="address"
            required
          />
        </div>
        <h1 className=" text-4xl my-5">Preference</h1>
        <div className=" grid grid-cols-2 text-center">
          <label className=" my-2" htmlFor="carMake">
            Car Brand
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="carMake"
            name="carMake"
            required
          />

          <label className=" my-2" htmlFor="carModel">
            Car Model
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="carModel"
            name="carModel"
            required
          />

          <label className=" my-2" htmlFor="maximumPrice">
            Maximum Price
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="number"
            id="maximumPrice"
            name="maximumPrice"
            required
          />
        </div>
        <h1 className=" text-4xl my-5">Bank Data</h1>
        <div className=" grid grid-cols-2 text-center">
          <label className=" my-2" htmlFor="maximumPrice">
            Bank
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="bankName"
            name="bankName"
            required
          />

          <label className=" my-2" htmlFor="maximumPrice">
            Account Number
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="accountNumber"
            name="accountNumber"
            required
          />

          <label className=" my-2" htmlFor="balance">
            Set Initial Balance
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="number"
            id="balance"
            name="balance"
            required
          />
        </div>
        <button
          className=" bg-cyan-300 mt-10 px-2 w-1/4 rounded-lg hover:bg-cyan-400"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
