import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-discord_blurple text-black">
      <a href="/">
        <img
          src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b5061df290f5892d944_full_logo_black_RGB.svg"
          alt=""
          className="h-8"
        />
      </a>
      <div className="space-x-4 hidden lg:flex">
        <a href="" className="nav_link">Download</a>
        <a href="" className="nav_link">Nitro</a>
        <a href="" className="nav_link">Discover</a>
        <a href="" className="nav_link">Safety</a>
        <a href="" className="nav_link">Support</a>
        <a href="" className="nav_link">Blog</a>
        <a href="" className="nav_link">Careers</a>
      </div>
      <div className="flex items-center space-x-2 justify-center">
        <button className="p-2 bg-black text-white text-xs rounded-full px-4 md:text-sm hover:text-discord_blurple hover:shadow-2xl
        transition duration-200 ease-in-out font-medium">Login</button>
        <Bars3Icon className="w-9 cursor-pointer lg:hidden"/>
      </div>
    </div>
  );
};

export default Header;
