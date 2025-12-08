import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../config/axios";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "manish@gmail.com",
    password: "Manish@123",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", formData);

      // Store the loggedIn status in localstorage to keep the status persist in all pages
      localStorage.setItem("isLoggedIn", true);
      alert(res?.data?.message);
    } catch (error) {
      alert(error?.response?.data?.error);
    }
  };

  return (
    <div className="px-6 flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="w-72 rounded shadow-xl md:w-96">
        <h1 className="bg-blue-400 font-bold text-white text-center text-xl py-2 mb-4">
          Login
        </h1>
        <form className="py-2 px-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-full md:w-1/4">Username: </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none md:w-3/4"
            />
          </div>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3 relative">
            <label className="w-full md:w-1/4">Password: </label>
            <input
              type={`${passwordIsVisible ? "text" : "password"}`}
              placeholder="Enter your password"
              value={formData.password}
              name="password"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="bg-gray-100 pl-2 pr-8 py-1 w-full rounded outline-none md:w-3/4"
            />
            {passwordIsVisible ? (
              <FaEyeSlash
                className="absolute right-2.5 bottom-2 cursor-pointer"
                onClick={() => setPasswordIsVisible(false)}
              />
            ) : (
              <FaEye
                className="absolute right-2.5 bottom-2 cursor-pointer"
                onClick={() => setPasswordIsVisible(true)}
              />
            )}
          </div>
          <button className="px-5 py-1 w-full bg-blue-400 font-bold text-white mt-3 cursor-pointer active:scale-90 transition-all">
            Login
          </button>
        </form>
        <div className="flex flex-col gap-3 px-3">
          <Link to={"/forgot-password"}>
            <p className="underline text-blue-700 text-center cursor-pointer">
              Forgot password?
            </p>
          </Link>
          <Link to={"/signup"}>
            <button
              type="submit"
              className="px-5 py-1 bg-green-500 font-bold text-white mb-3 cursor-pointer active:scale-90 transition-all w-full"
            >
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
