import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import left from "../assets/home-left.svg";
import right from "../assets/home-right.svg";

const Hero = () => {
  return (
    <div className="bg-discord_blurple text-white overflow-x-hidden">
      <div className="h-screen md:h-[85vh] md:flex px-6 py-14 bg-discord_blurple relative">
        <div className="flex flex-col  lg:justify-center lg:items-center gap-6  lg:max-w-none md:max-w-md">
          <h1 className="font-extrabold lg:text-[44px] text-2xl">
            IMAGINE A PLACE...
          </h1>
          <h2 className="tracking-wide lg:max-w-3xl w-full">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row md:flex-col lg:flex-row sm:justify-start md:justify-start">
            <button className="w-72 bg-white text-black p-4 font-medium rounded-full flex justify-center items-center hover:text-discord_blurple">
              <ArrowDownTrayIcon className="w-7 mr-2" />
              Download for Windows
            </button>
            <button className="w-72 bg-gray-900 p-4 rounded-full hover:bg-gray-700 font-medium flex items-center justify-center">
              Open Discord in your browser
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <img
            src={left}
            alt=""
            className="absolute -left-36 sm:-lef-44 mt-2 md:hidden"
          />
          <img src={right} alt="" className="hidden md:inline absolute" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
