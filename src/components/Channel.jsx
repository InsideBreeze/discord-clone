import { HashtagIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChannelInfo } from "../reducers/channelReducer";

const Channel = ({ id, channelName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName,
      })
    );
    navigate(`/channels/${id}`);
  };
  return (
    <div
      className="flex items-center p-1 hover:bg-gray-600 rounded-xl cursor-pointer hover:text-white"
      onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-1" />
      {channelName}
    </div>
  );
};

export default Channel;
