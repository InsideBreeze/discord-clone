import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import ServerIcon from "./ServerIcon";

const Channels = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="h-screen flex">
      {/* sidebar */}
      <div className="bg-[#202225] flex flex-col space-y-3 p-2">
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
        {/* group makes you hover this outer div, then the plus will become white */}
        <div className="server_default hover:bg-discord_green group">
          <PlusIcon className="h-6 text-discord_green group-hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Channels;
