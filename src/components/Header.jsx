import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const menus = [
  "Download",
  "Nitro",
  "Discover",
  "Safety",
  "Support",
  "Blog",
  "Careers",
];

const Header = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

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
        {menus.map((menu) => (
          <a key={menu} className="nav_link">
            {menu}
          </a>
        ))}
      </div>
      <div className="flex items-center space-x-2 justify-center">
        <button
          className="p-2 bg-white text-black text-xs rounded-full px-4 md:text-sm hover:text-discord_blurple hover:shadow-2xl
        transition duration-200 ease-in-out font-medium"
          onClick={
            user
              ? () => {
                  navigate("/channels");
                }
              : () => navigate("/login")
          }
        >
          {user ? "Open Discord" : "Login"}
        </button>
        <Bars3Icon className="w-9 cursor-pointer lg:hidden" />
      </div>
    </div>
  );
};

export default Header;
