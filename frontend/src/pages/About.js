import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col items-center md:flex-row gap-16">
        <img
          className="w-[80%] md:max-w-[450px] md:max-h-[450px]"
          src={assets.about_img}
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600">
          <p>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
      </div>
      <div className="mt-[150px] flex flex-col justify-center items-center w-full shadow-lg border py-20 max-w-[700px] ml-auto mr-auto">
        <p className="text-3xl font-bold mb-[20px]">
          Subsribe now & get 20% off
        </p>
        <p className="text-gray-400">
          lorem ipsum is a dummy text generator which works on web mobile and
          softwares as well
        </p>
        <div className="mt-4 w-full flex items-center justify-center flex-row p-2">
          <input
            className="h-[50px] border-2 w-full p-1 sm:w-[400px]"
            type="email"
            placeholder="Enter your email here"
          />
          <button className="w-[40%] bg-black text-white text-sm p-2 sm:h-[50px] sm:w-[100px]">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
