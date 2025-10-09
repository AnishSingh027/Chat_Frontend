import { useEffect, useRef, useState } from "react";

const UpdatePassword = () => {
  const OTPField = useRef([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const OTP = OTPField.current.map((item) => item.value).join("");
    console.log(OTP);
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
            <label className="w-full lg:w-1/4">Password: </label>
            <input
              type="text"
              name="password"
              placeholder="Enter new password"
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none lg:w-3/4"
            />
          </div>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-full lg:w-1/4">Confirm Password: </label>
            <input
              type="text"
              name="confirmPassword"
              placeholder="confirm password"
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none lg:w-3/4"
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
