import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm bg-black text-white p-10">
        <div>
          <span className="w-32 text-white text-4xl font-bold bg-black mb-5">
            MARTIAN
          </span>
          <p className="w-full md:w-2/3 text-white-600 mt-[40px]">
            lorem ipsum is simple dummmy text of the printing and typsetting
            industry. lorem ispsum has done nothing good in life of a normal
            student
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-white-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-white-600">
            <li>7970650453,8580245323</li>
            <li>abhishek2003@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@martian.com All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
