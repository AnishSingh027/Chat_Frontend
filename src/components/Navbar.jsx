import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import api from "../config/axios";
import { useEffect } from "react";

const Navbar = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // Logout User (logic unchanged)
  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/logout");

      if (res?.status == 200) {
        alert(res?.data?.message);
        setIsUserLoggedIn("false");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1
            className="text-xl md:text-2xl font-semibold text-white tracking-wide"
            onClick={() => setIsOpen(false)}
          >
            Hike
          </h1>
        </Link>

        {/* Right Section */}
        {isUserLoggedIn == "true" ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="focus:outline-none group"
            >
              <img
                src="https://png.pngtree.com/png-vector/20250602/ourmid/pngtree-logo-simple-panda-face-for-green-brand-png-image_16378069.png"
                className="w-11 h-11 rounded-full border-2 border-white/20 group-hover:border-blue-400 transition-all duration-300 shadow-md"
              />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                <DropdownItem to="/profile" onClick={() => setIsOpen(false)}>
                  Profile
                </DropdownItem>
                <DropdownItem
                  to="/sent-request"
                  onClick={() => setIsOpen(false)}
                >
                  Sent Requests
                </DropdownItem>
                <DropdownItem
                  to="/received-request"
                  onClick={() => setIsOpen(false)}
                >
                  Received Requests
                </DropdownItem>
                <DropdownItem
                  to="/connections"
                  onClick={() => setIsOpen(false)}
                >
                  Connections
                </DropdownItem>

                <div className="h-px bg-white/10 my-1" />

                <button
                  onClick={(e) => logoutUser(e)}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="px-5 md:px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

// Reusable Dropdown Item (UI only abstraction)
const DropdownItem = ({ to, children, onClick }) => (
  <Link to={to}>
    <div
      onClick={onClick}
      className="px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
    >
      {children}
    </div>
  </Link>
);

export default Navbar;
