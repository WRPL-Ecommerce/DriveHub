import { useUser } from "@supabase/auth-helpers-react";

export default function ProfileForm() {
  const user = useUser();
  async function handleSubmit(e) {
    console.log(e);
    alert("success");
  }
  return (
    <>
      <form className="flex flex-col items-center my-5" onSubmit={handleSubmit}>
        <h1 className=" text-4xl my-5">Complete Profile</h1>
        <div className=" grid grid-cols-2">
          <div className="flex flex-col items-center mx-2">
            <label className=" my-2" htmlFor="firstName">
              First Name
            </label>
            <label className=" my-2" htmlFor="lastName">
              Last Name
            </label>
            <label className=" my-2" htmlFor="email">
              Email
            </label>
            <label className=" my-2" htmlFor="phone">
              Phone
            </label>
          </div>
          <div className="flex flex-col justify-center">
            <input
              className=" my-2 border-solid border-2 border-gray-500"
              type="text"
              id="firstName"
              name="firstName"
              required
            />
            <input
              className=" my-2 border-solid border-2 border-gray-500"
              type="text"
              id="lastName"
              name="lastName"
              required
            />
            <input
              className=" my-2"
              type="text"
              id="email"
              name="email"
              disabled
              value={user.email}
            />
            <input
              className=" my-2 border-solid border-2 border-gray-500"
              type="text"
              id="phone"
              name="phone"
              required
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
