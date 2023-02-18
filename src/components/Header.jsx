import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const login = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate("/channels"))
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <div className="flex justify-between items-center p-6 bg-discord_blurple text-white lg:px-10">
      <a href="/">
        <img
          src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b5493894cf60b300587_full_logo_white_RGB.svg"
          alt=""
          className="h-8"
        />
      </a>
      <div className="space-x-4 hidden lg:flex">
        <a href="" className="nav_link">
          Download
        </a>
        <a href="" className="nav_link">
          Nitro
        </a>
        <a href="" className="nav_link">
          Discover
        </a>
        <a href="" className="nav_link">
          Safety
        </a>
        <a href="" className="nav_link">
          Support
        </a>
        <a href="" className="nav_link">
          Blog
        </a>
        <a href="" className="nav_link">
          Careers
        </a>
      </div>
      <div className="flex items-center space-x-2 justify-center">
        <button
          className="p-2 bg-white text-black text-xs rounded-full px-4 md:text-sm hover:text-discord_blurple hover:shadow-2xl
        transition duration-200 ease-in-out font-medium"
          onClick={login}
        >
          Login
        </button>
        <Bars3Icon className="w-9 cursor-pointer lg:hidden" />
      </div>
    </div>
  );
};

export default Header;
