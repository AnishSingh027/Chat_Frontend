import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

const Profile = () => {
  const { userData } = useContext(UserContext);
  // console.log("userData", userData);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    age: 18,
    email: "",
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfEZuXEukqa8SwV2d7ljO953CHhugCD0IHWw&s",
  });

  useEffect(() => {
    if (!userData) return;

    setFormData((prev) => ({
      ...prev,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      gender: userData.gender || "male",
      age: userData.age || 18,
      email: userData.email || "",
      photoUrl:
        userData.photoUrl ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfEZuXEukqa8SwV2d7ljO953CHhugCD0IHWw&s",
    }));
  }, [userData]);

  console.log("FormData", formData);

  return (
    <div className="w-full h-[calc(100vh-100px)] p-8 md:px-12 md:py-8">
      <h1 className="font-bold text-3xl mb-10">Edit your profile</h1>
      <form>
        <div className="flex justify-between flex-col gap-5 md:gap-8 md:flex-row">
          <div className="w-full md:w-3/5">
            <div className="flex gap-5 flex-col mb-8">
              <label className="1/5 text-xl">Email: </label>
              <input
                type="text"
                value={formData.email}
                placeholder="abc@gmail.com"
                className="w-full p-3 rounded outline-none border-black border cursor-not-allowed text-gray-500 md:4/5"
                readOnly={true}
              />
            </div>
            <div className="flex gap-5 flex-col mb-8">
              <label className="1/5 text-xl">Firstname: </label>
              <input
                type="text"
                value={formData.firstName}
                placeholder="Enter firstname"
                className="w-full p-3 rounded outline-none border-black border md:4/5"
              />
            </div>
            <div className="flex gap-5 flex-col mb-8">
              <label className="1/5 text-xl">Lastname: </label>
              <input
                type="text"
                value={formData.lastName}
                placeholder="Enter lastname"
                className="w-full p-3 rounded outline-none border-black border md:4/5"
              />
            </div>
            <div className="flex gap-5 flex-col mb-8">
              <label className="1/5 text-xl">Gender: </label>
              <select
                className="w-3/5 bg-blue-500 text-white px-3 py-2 rounded md:w-1/5"
                value={formData.gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex gap-5 flex-col mb-8">
              <label className="1/5 text-xl">Age: </label>
              <input
                type="number"
                max={100}
                value={formData.age}
                className="w-3/5 px-3 py-2 rounded bg-blue-500 text-white md:w-1/5"
              />
            </div>
          </div>
          <div className="w-full md:w-1/5 mb-8 md:mb-0">
            <div className="mb-8">
              <img
                src={formData.photoUrl}
                alt="Profile picture"
                className="w-80 h-96 object-cover object-top rounded-xl md:w-full md:h-full"
              />
            </div>
            <input
              type="text"
              value={formData.photoUrl}
              placeholder="Enter image URL"
              className="w-full p-3 rounded outline-none border-black border"
            />
          </div>
        </div>
        <div className="pb-8">
          <button
            type="submit"
            className="w-full text-center font-bold py-3 bg-blue-500 rounded text-xl text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
