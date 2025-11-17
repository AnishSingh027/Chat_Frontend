import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("manish@gmail.com");
  const navigate = useNavigate();

  const handleNavigate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/reset-password-otp", { email });
      alert(res?.data?.message);
      navigate("/update-password", { state: { email } });
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  return (
    <div className="px-6 flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="w-72 rounded shadow-xl md:w-96">
        <h1 className="bg-blue-400 font-bold text-white text-center text-xl py-2 mb-4">
          Forgot Password
        </h1>
        <form className="py-2 px-4 flex flex-col gap-3">
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-1/5">Username: </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none lg:w-4/5"
            />
          </div>
          <button
            type="submit"
            onClick={handleNavigate}
            className="px-5 py-1 w-full bg-blue-400 font-bold text-white mt-3 cursor-pointer active:scale-90 transition-all"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
