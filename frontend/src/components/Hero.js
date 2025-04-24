import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text:sm md:text-base">OUR BESTSELLER</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed text-gray-800">
            START THE <span class="text-red-500">F</span>
            <span class="text-orange-500">A</span>
            <span class="text-yellow-500">S</span>
            <span class="text-green-500">H</span>
            <span class="text-blue-500">I</span>
            <span class="text-indigo-500">O</span>
            <span class="text-purple-500">N</span> NOW
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <img className="w-full sm:w-1/2" src={assets.banner} />
    </div>
  );
};

export default Hero;
