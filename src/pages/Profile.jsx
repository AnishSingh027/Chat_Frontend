import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import api from "../config/axios";

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);

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

  const handleOnChange = (e) => {
    const { name, value } = e?.target || {};
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setUserData(formData);

    try {
      const res = await api.post(
        `/user/update-details/${userData?._id}`,
        formData,
      );

      if (res?.status == 200) {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.log(error?.response?.data?.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 md:px-10 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-8">
          Edit Profile
        </h1>

        <form onSubmit={handleOnSubmit} className="grid md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="md:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-400">Email</label>
              <input
                type="text"
                value={formData.email}
                readOnly
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-400">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                name="firstName"
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-400">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                name="lastName"
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender + Age */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-sm text-slate-400">Gender</label>
                <select
                  value={formData.gender}
                  name="gender"
                  onChange={handleOnChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <label className="text-sm text-slate-400">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  max={100}
                  onChange={handleOnChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center gap-4">
            <img
              src={formData.photoUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border border-white/10 shadow-md"
            />

            <input
              type="text"
              value={formData.photoUrl}
              name="photoUrl"
              onChange={handleOnChange}
              placeholder="Enter image URL"
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
