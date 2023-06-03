import { useUser } from "@supabase/auth-helpers-react";

export default function PhoneUpdate() {
  const user = useUser();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: user.email,
      phone: e.target.phone.value,
    };
    console.log(data);

    const response = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const responseData = response.json();
    console.log(response.status);
    console.log(responseData);

    if (response.status === 200) alert("success");
    else alert("failed");
    window.location.reload();
  }
  return (
    <form className="grid grid-cols-3 items-center" onSubmit={handleSubmit}>
      <label className=" text-end my-2 mx-2" htmlFor="phone">
        Phone
      </label>
      <input
        className=" my-2 border-solid border-2 border-gray-500"
        type="text"
        id="phone"
        name="phone"
        required
      />
      <button className=" text-left mx-2" type="submit">
        Update
      </button>
    </form>
  );
}
