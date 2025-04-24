import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState("");
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="w-[100%] flex py-5 font-medium h-[10vh] items-center justify-between bg-black">
      {/* <img src={assets.logo} className="w-36 h-10" alt="network error" /> */}
      <Link to="/">
        <span className="ml-5 text-white text-4xl font-bold bg-black cursor-pointer">
          MARTIAN
        </span>
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-white h-12 items-center ml-[-50px]">
        <NavLink
          className={`flex flex-col items-center gap-1 text-white no-underline hover:text-gray-400 `}
          to="/"
          onClick={() => setClicked("home")}
        >
          <p className={`${clicked == "home" ? "text-gray-400" : ""}`}>HOME</p>
        </NavLink>

        <NavLink
          onClick={() => setClicked("collection")}
          className="flex flex-col items-center gap-1 text-white no-underline hover:text-gray-400"
          to="/collection"
        >
          <p className={`${clicked == "collection" ? "text-gray-400" : ""}`}>
            COLLECTION
          </p>
        </NavLink>

        <NavLink
          onClick={() => setClicked("about")}
          className="flex flex-col items-center gap-1 text-white no-underline hover:text-gray-400"
          to="/about"
        >
          <p className={`${clicked == "about" ? "text-gray-400" : ""}`}>
            ABOUT
          </p>
        </NavLink>

        <NavLink
          className="flex flex-col items-center gap-1 text-white no-underline hover:text-gray-700 hidden"
          to="/contact "
        >
          <p>CONTACT</p>
          {/* <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" /> */}
        </NavLink>
      </ul>
      <div className="flex items-center gap-6 mr-5 bg-black">
        {/* <img
          onClick={() => setShowSearch(true)}
          src={<CiSearch />}
          className="w-5 cursor-pointer text-white"
          alt="Internet error "
        /> */}
        <CiSearch
          onClick={() => setShowSearch(true)}
          className="w-7 h-7 cursor-pointer text-white hidden sm:inline-block"
        />
        <div className="group relative">
          <Link to="/login">
            <CiUser
              className="w-7 h-7 cursor-pointer text-white inline-block"
              // onClick={() => (token ? null : navigate("/login"))}
            />
          </Link>
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 border-0">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={() => logout()}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          {/* <img
            src={assets.cart_icon}
            className="w-5 min-w-5 bg-danger-700"
            alt=""
          /> */}
          <BsHandbag className="w-6 h-6 cursor-pointer text-white inline-block" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-white text-black aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        {/* <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden "
          alt=""
        /> */}
        <IoMdMenu
          onClick={() => setVisible(true)}
          className="w-7 h-7 cursor-pointer sm:hidden text-white"
        />
      </div>
      <div
        className={`${
          visible ? "w-full" : "w-0"
        } absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img className="h-4 rotate-180" src="assets.dropdown_icon" alt="" />
            <p>Back</p>
          </div>

          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/about"
          >
            ABOUT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
