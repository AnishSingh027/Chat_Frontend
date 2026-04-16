import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/axios";

const UpdatePassword = () => {
  const OTPField = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location?.state?.email || "",
    otp: "",
    password: "",
  });

  const handleInputField = (e, index) => {
    const value = e.target.value;
    if (
      value.length == 1 &&
      index < OTPField.current.length - 1 &&
      !isNaN(value)
    ) {
      OTPField.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const value = e.target.value;
    if (value.length == 0 && index > 0 && e.key == "Backspace") {
      OTPField.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const otp = OTPField.current.map((item) => item.value).join("");
      setFormData((prev) => ({ ...prev, otp }));

      const updatedData = { ...formData, otp };

      const res = await api.post("/user/reset-password", updatedData);
      alert(res?.data?.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error);
    }
  };

  useEffect(() => {
    if (OTPField.current[0]) {
      OTPField.current[0].focus();
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <h1 className="text-xl font-semibold text-white text-center tracking-wide">
            Set New Password
          </h1>
          <p className="text-sm text-slate-400 text-center mt-1">
            Enter OTP and create a new password
          </p>
        </div>

        {/* Form */}
        <form className="px-6 py-6 flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* OTP */}
          <div className="flex justify-between gap-2">
            {new Array(6).fill("").map((_, index) => (
              <input
                key={index}
                ref={(element) => (OTPField.current[index] = element)}
                type="text"
                placeholder="•"
                maxLength={1}
                onChange={(e) => handleInputField(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full h-12 text-center rounded-xl bg-white/5 border border-white/10 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            ))}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-400">New Password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Enter new password"
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-400">Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              autoComplete="off"
              placeholder="Confirm password"
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
