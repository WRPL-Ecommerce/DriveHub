import BalanceUpdate from "./balanceUpdate";
import FirstNameUpdate from "./firstNameUpdate";
import LastNameUpdate from "./lastNameUpdate";
import PhoneUpdate from "./phoneUpdate";

export default function ProfileUpdate() {
  return (
    <>
      <div className="flex flex-col items-center my-5">
        <h1 className=" text-4xl my-5">Update Profile</h1>
        <div className=" w-1/2 grid grid-rows-3  gap-5">
          <FirstNameUpdate />
          <LastNameUpdate />
          <PhoneUpdate />
          <div>
            <h1 className=" text-2xl text-center ">Top up balance</h1>
            <BalanceUpdate />
          </div>
        </div>
      </div>
    </>
  );
}
