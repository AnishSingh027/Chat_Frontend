import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-blue-400 py-3 px-6 flex items-center justify-between md:px-12 md:py-5">
      <Link to={"/"}>
        <h1 className="text-3xl text-white font-bold">Hike</h1>
      </Link>

      {isLoggedIn ? (
        <div className="relative group">
          <button className="focus:outline-none">
            <img
              src="https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg"
              className="cursor-pointer w-12 h-12 rounded-3xl border-2 border-white"
            />
          </button>

          <div className="absolute right-0 py-2 w-40 bg-gray-100 rounded shadow-lg z-50 flex flex-col gap-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-300">
            <h1 className="hover:bg-gray-300 w-full py-2 text-center transition-all focus-within:bg-gray-300">
              Profile
            </h1>
            <h1 className="hover:bg-gray-300 w-full py-2 text-center transition-all">
              Add Friends
            </h1>
            <h1 className="hover:bg-gray-300 w-full py-2 text-center transition-all">
              Connections
            </h1>
            <h1 className="hover:bg-gray-300 w-full py-2 text-center transition-all">
              Logout
            </h1>
          </div>
        </div>
      ) : (
        <Link to={"/login"}>
          <button className="px-7 py-2 bg-blue-700 rounded font-bold text-white cursor-pointer focus:scale-90 transition-all">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
