import { useUser } from "@supabase/auth-helpers-react";

export default function CustomerInsert() {
  const user = useUser();
  async function handleSubmit(e) {
    e.preventDefault();
    const customer = {
      contact_name: e.target.fullName.value,
      company: e.target.company.value,
      country_region: e.target.country.value,
      email: user.email,
    };
    console.log(customer);

    const response = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify(customer),
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
      <h1 className=" text-center">Complete Profile</h1>
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
          <label className=" my-2" htmlFor="company">
            Company
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="company"
            name="company"
            required
          />

          <label className=" my-2" htmlFor="country">
            Country/Region
          </label>
          <input
            className=" my-2 border-solid border-2 border-gray-500"
            type="text"
            id="country"
            name="country"
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
