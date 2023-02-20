import { HashtagIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const Channel = ({ id, channelName }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center p-1 hover:bg-gray-600 rounded-xl cursor-pointer hover:text-white"
      onClick={() => navigate(`/channels/${id}`)}
    >
      <HashtagIcon className="h-5 mr-1" />
      {channelName}
    </div>
  );
};

export default Channel;
