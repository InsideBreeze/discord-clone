import {
  BellIcon,
  ChartBarIcon,
  FaceSmileIcon,
  GifIcon,
  HashtagIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { useSelector } from "react-redux";

const Chat = () => {
  const channelName = useSelector((state) => state.channel.channelName);
  /* placeholder-[#72767d] */
  /* whole: bg-[#313338] */
  /* input: bg-[#202225] */

  return (
    <div className="h-screen bg-[#313338] flex flex-col">
      <header className="flex justify-between p-2.5 border-b border-gray-800 text-gray-300 items-center">
        <div className="flex space-x-1 items-center">
          <HashtagIcon className="w-5" />
          <h4 className="font-semibold">
            {channelName ? channelName : "Department of Compute..."}
          </h4>
        </div>
        <div className="flex space-x-2 items-center">
          <BellIcon className="icon hover:text-gray-100" />
          <ChartBarIcon className="icon hover:text-gray-100" />
          <UsersIcon className="icon hover:text-gray-100" />
          <div className="flex bg-[#202225] rounded-md items-center">
            <input
              type="text"
              className="bg-transparent text-sm p-1 focus:outline-none"
              placeholder="Search"
            />
            <MagnifyingGlassIcon className="w-4 mr-1" />
          </div>
          <InboxIcon className="icon hover:text-gray-100" />
          <QuestionMarkCircleIcon className="icon hover:text-gray-100" />
        </div>
      </header>
      <main className="flex-grow">messages</main>
      <div className="flex p-2.5 items-center space-x-1 mb-2 mx-4 bg-[#202225] rounded-lg text-gray-300">
        <PlusCircleIcon className="h-7 hover:text-gray-100 cursor-pointer" />
        <form className="flex-grow">
          <input
            type="text"
            className="w-full bg-transparent focus:outline-none text-[#dcddde]"
            placeholder={
              channelName
                ? ` Message #${channelName}`
                : "Select a channel to chat"
            }
            disabled={channelName === null}
          />
          <button hidden>send</button>
        </form>
        <GifIcon className="h-7 hover:text-gray-100 cursor-pointer" />
        <FaceSmileIcon className="h-7 hover:text-gray-100 cursor-pointer" />
      </div>
    </div>
  );
};

export default Chat;
