import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const NavBar = ({ setToken }) => {
  return (
    <div className="w-[95%] flex items-center py-2 px-[4%] justify-between bg-black ml-auto mr-auto">
      <Link to="/">
        <div className="bg-black">
          <h2 className="text-white text-3xl font-bold">Martian</h2>
          <p className="text-gray-200">Admin Panel</p>
        </div>
      </Link>
      <button
        className="bg-white text-gray-500 font-bold px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:text-black"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
