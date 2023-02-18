import React from "react";

const ServerIcon = ({ image }) => {
  return (
    <img
      src={image}
      alt=""
      className="rounded-full w-12 mt-2 hover:rounded-2xl transition-all duraion-100 ease-out cursor-pointer"
    />
  );
};

export default ServerIcon;
