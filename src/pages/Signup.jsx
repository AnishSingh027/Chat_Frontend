import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../config/axios";

const Signup = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const initialState = {
    firstName: "",
    lastName: "",
    age: 18,
    gender: "male",
    email: "",
    password: "",
    photoUrl: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/signup", formData, {
        withCredentials: false,
      });
      alert(res?.data?.message);
      setFormData(initialState);
    } catch (error) {
      alert(error?.response?.data?.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <h1 className="text-xl font-semibold text-white text-center">
            Create Account
          </h1>
          <p className="text-sm text-slate-400 text-center mt-1">
            Join and start connecting
          </p>
        </div>

        {/* Form */}
        <form className="px-6 py-6 flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Age + Gender */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.gender}
              onChange={handleChange}
              name="gender"
              className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Image */}
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="Profile image URL"
            className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={passwordIsVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {passwordIsVisible ? (
              <FaEyeSlash
                className="absolute right-3 top-3 text-slate-400 cursor-pointer hover:text-white"
                onClick={() => setPasswordIsVisible(false)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-3 text-slate-400 cursor-pointer hover:text-white"
                onClick={() => setPasswordIsVisible(true)}
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Sign Up
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
