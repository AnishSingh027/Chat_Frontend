import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../config/axios";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "manish@gmail.com",
    password: "Manish@123",
  });

  const { setIsUserLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", formData);

      if (res?.status == 200) {
        localStorage.setItem("isLoggedIn", true);
        setIsUserLoggedIn("true");
      }
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message,
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <h1 className="text-xl font-semibold text-white text-center tracking-wide">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-400 text-center mt-1">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form className="px-6 py-6 flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-400">Email</label>
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
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm text-slate-400">Password</label>
            <input
              type={passwordIsVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              name="password"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="w-full px-3 py-2.5 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {passwordIsVisible ? (
              <FaEyeSlash
                className="absolute right-3 top-9 text-slate-400 cursor-pointer hover:text-white transition"
                onClick={() => setPasswordIsVisible(false)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-9 text-slate-400 cursor-pointer hover:text-white transition"
                onClick={() => setPasswordIsVisible(true)}
              />
            )}
          </div>

          {/* Login Button */}
          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200">
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 flex flex-col gap-3">
          <Link to="/forgot-password">
            <p className="text-sm text-slate-400 hover:text-white text-center transition cursor-pointer">
              Forgot password?
            </p>
          </Link>

          <Link to="/signup">
            <button
              type="button"
              className="w-full py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
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
