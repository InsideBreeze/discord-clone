import { TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";

const Message = ({ message, id, email, name, photoURL, timestamp, image }) => {
  const channelId = useSelector((state) => state.channel.channelId);
  const [user] = useAuthState(auth);

  return (
    <div className="flex p-1 my-2.5 mr-2 ml-4 items-start hover:bg-opacity-10 rounded-md group bg-yellow">
      {/* <div className="flex items-center justify-center"> */}
      <img
        src={photoURL}
        alt=""
        className="mr-3 rounded-full cursor-pointer h-9 hover:shadow-2xl w-9"
      />
      {/*  </div> */}
      <div className="relative flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="font-medium p-0 hover:underline cursor-pointer text-[#f3f4f5] leading-5 tracking-wide">
            {name}
          </span>
          <span className="text-[#72767d] text-xs">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </div>
        <div className="">
          <p className="text-[#dcddde]">{message}</p>
          {image && (
            <div className="max-w-[250px] my-2">
              <img
                src={image}
                alt=""
                className="object-scale-down rounded-md max-w-10"
              />
            </div>
          )}
        </div>
      </div>
      <div
        className="text-[red] ml-auto rounded-md"
        onClick={async () =>
          deleteDoc(
            doc(
              collection(
                doc(collection(db, "channels"), channelId),
                "messages"
              ),
              id
            )
          )
        }
      >
        {name === user.displayName && (
          <TrashIcon className="hidden h-5 ml-auto cursor-pointer group-hover:inline" />
        )}
      </div>
    </div>
  );
};

export default Message;
