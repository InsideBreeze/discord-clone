import { HashtagIcon } from "@heroicons/react/24/outline";
import React from "react";

const Channel = ({ channelName }) => {
  return (
    <div className="flex items-center p-1 hover:bg-gray-600 rounded-xl cursor-pointer">
      <HashtagIcon className="h-5 mr-1" />
      {channelName}
    </div>
  );
};

export default Channel;
