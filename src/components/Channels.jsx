import {
  ArrowDownIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import Channel from "./Channel";
import ServerIcon from "./ServerIcon";

const Channels = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* servers sidebar */}
      <div className="bg-[#202225] flex flex-col space-y-3 p-2 overflow-y-scroll scrollbar-hide min-w-max">
        <div className="server_default hover:bg-discord_blurple">
          <img
            src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
            alt=""
            className="h-5"
          />
        </div>
        <hr className="w-7 mx-auto border border-gray-700" />
        <ServerIcon image="https://cdn.discordapp.com/icons/266695661670367232/a_d3df4a82d6bdde45de98d1afdd730ebc.webp" />
        <ServerIcon image=" https://cdn.discordapp.com/icons/757581218085863474/bac78418031b7a0c0af286d4cb29cc9b.webp" />
        <ServerIcon image="https://cdn.discordapp.com/icons/266695661670367232/a_d3df4a82d6bdde45de98d1afdd730ebc.webp" />
        <ServerIcon image=" https://cdn.discordapp.com/icons/757581218085863474/bac78418031b7a0c0af286d4cb29cc9b.webp" />
        {/* group makes you hover this outer div, then the plus icon will become white */}
        <div className="server_default hover:bg-discord_green group">
          <PlusIcon className="h-6 text-discord_green group-hover:text-white" />
        </div>
      </div>
      {/* channels sidebar */}
      {/* 
      bg: bg-[#2f3136]
      h4 hover: bg-[#34373c]
      text: text-[#8e9297] 
       */}
      <div className="bg-[#2f3136] min-w-max  ">
        <div
          className="flex text-white justify-between items-center border-b border-gray-800 p-2
        hover:bg-[#34373c]"
        >
          <h2 className="font-bold">Department of Compute...</h2>
          <ChevronDownIcon className="w-6 ml-2" />
        </div>
        <div className="overflow-y-scroll scrollbar-hide h-screen">
          <div className="text-[#8e9297] flex items-center justify-start p-3 ">
            <ChevronDownIcon className="w-4" />
            <h4 className="ml-2 font-medium">Channels</h4>
            <PlusIcon className="w-7 ml-auto hover:text-white" />
          </div>
          {/* channels */}
          <div className="">
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
            <Channel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
