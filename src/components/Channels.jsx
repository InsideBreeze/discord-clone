import {
  ChevronDownIcon,
  CogIcon,
  MicrophoneIcon,
  PhoneIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth, db } from "../firebase";
import Channel from "./Channel";
import ServerIcon from "./ServerIcon";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

const Channels = () => {
  const [user] = useAuthState(auth);

  // https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore
  const [channels] = useCollection(collection(db, "channels"));

  // add channel to the server
  // https://firebase.google.com/docs/firestore/quickstart
  const addChannel = async () => {
    const channelName = prompt(
      "Please enter the name of channel you want to add."
    );
    if (channelName) {
      try {
        // Firestore creates collections and documents implicitly the first time you add data to the document. You do not need to explicitly create collections or documents.
        await addDoc(collection(db, "channels"), {
          channelName,
        });
      } catch (error) {
        console.error("Error adding channel: ", e);
      }
    }
  };

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
      <div className="bg-[#2f3136] min-w-max h-screen flex flex-col">
        <div
          className="flex text-[#f3f4f5] justify-between items-center border-b border-gray-800 p-2
        hover:bg-[#34373c]"
        >
          <h2 className="font-bold">Department of Compute...</h2>
          <ChevronDownIcon className="w-4 ml-2" />
        </div>
        <div className="overflow-y-scroll scrollbar-hide text-[#8e9297] flex-grow">
          <div className=" flex items-center justify-start p-3 ">
            <ChevronDownIcon className="w-4" />
            <h4 className="ml-2 font-medium">Channels</h4>
            <PlusIcon
              className="w-7 ml-auto hover:text-white"
              onClick={addChannel}
            />
          </div>
          {/* channels */}
          <div className="space-y-1">
            {channels &&
              channels.docs.map((channel) => (
                <Channel
                  key={channel.id}
                  id={channel.id}
                  channelName={channel.data().channelName}
                />
              ))}
          </div>
        </div>
        {/* user info */}
        <div className="flex items-center justify-between bg-[#232428] p-1 ">
          <div className="flex space-x-2 items-center hover:bg-gray-700 cursor-pointer rounded-md p-1 pr-3">
            <div className="">
              <img
                src={user?.photoURL}
                alt=""
                className="h-9 rounded-full"
                onClick={() => auth.signOut()}
              />
            </div>
            <div className="font-medium">
              <h5 className="text-[#f3f4f5] text-sm">{user?.displayName}</h5>
              <span className="block -mt-1 text-[#b8b9bf] text-xs">
                #{user?.uid.substring(0, 4)}
              </span>
            </div>
          </div>
          <div className="flex space-x-1 text-gray-100">
            <MicrophoneIcon className="icon p-1" />
            <PhoneIcon className="icon p-1" />
            <CogIcon className="icon p-1" />
          </div>
        </div>
      </div>

      {/* chat */}
      <div className="flex-grow">
        <Chat />
      </div>
    </div>
  );
};

export default Channels;
