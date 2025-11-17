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
    <div className="px-6 flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="w-72 rounded shadow-xl md:w-96">
        <h1 className="bg-blue-400 font-bold text-white text-center text-xl py-2 mb-4">
          Set New Password
        </h1>
        <form className="py-2 px-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="items-start justify-between gap-2 flex md:flex-row md:items-center md:gap-3">
            {new Array(6).fill("").map((_, index) => (
              <input
                key={index}
                ref={(element) => (OTPField.current[index] = element)}
                type="text"
                placeholder="0"
                maxLength={1}
                onChange={(e) => handleInputField(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="bg-gray-100 px-2 py-1 w-full rounded outline-none text-center focus:shadow-2xl"
              />
            ))}
          </div>
          <div className="items-start justify-between gap-2 flex flex-col mt-3 md:flex-row md:items-center md:gap-3">
            <label className="w-full md:w-1/4">Password: </label>
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
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none md:w-3/4"
            />
          </div>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-full md:w-1/4">Confirm: </label>
            <input
              type="text"
              name="confirmPassword"
              autoComplete="off"
              placeholder="Confirm password"
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none md:w-3/4"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-1 bg-blue-400 font-bold text-white mt-3 cursor-pointer active:scale-90 transition-all"
          >
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
