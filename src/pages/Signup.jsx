import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: 18,
    gender: "male",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("FormData", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 flex items-center justify-center my-7 lg:mt-0 lg:h-[calc(100vh-120px)]">
      <div className="w-72 rounded shadow-xl md:w-96">
        <h1 className="bg-blue-400 font-bold text-white text-center text-xl py-2 mb-4">
          Signup
        </h1>
        <form className="py-2 px-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-full lg:w-1/4">Firstname: </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your firstname"
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none lg:w-3/4"
            />
          </div>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-full lg:w-1/4">Lastname: </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your lastname"
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none lg:w-3/4"
            />
          </div>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-full lg:w-1/4">Age: </label>
            <input
              type="number"
              name="age"
              onChange={(e) => handleChange(e)}
              value={formData.age}
              placeholder="Enter your age"
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none lg:w-3/4"
            />
          </div>
          <div className="items-start gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-full lg:w-1/4">Gender: </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange(e)}
              name="gender"
              className="bg-blue-500 px-3 py-1 text-white rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3">
            <label className="w-full lg:w-1/4">Username: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your email"
              className="bg-gray-100 px-2 py-1 w-full rounded outline-none lg:w-3/4"
            />
          </div>
          <div className="items-start justify-between gap-2 flex flex-col md:flex-row md:items-center md:gap-3 relative">
            <label className="w-full lg:w-1/4">Password: </label>
            <input
              type={`${passwordIsVisible ? "text" : "password"}`}
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              className="bg-gray-100 pl-2 pr-8 py-1 w-full rounded outline-none lg:w-3/4"
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
          <button
            type="submit"
            className="px-5 py-1 bg-blue-400 font-bold text-white mt-3 cursor-pointer active:scale-90 transition-all"
          >
            Signup
          </button>
          <p className="text-center mb-3">
            Already have an Account?{" "}
            <Link to={"/login"}>
              <span className="underline text-blue-700 cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
