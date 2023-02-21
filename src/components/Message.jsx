import { TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";

const Message = ({ message, id, email, name, photoURL, timestamp }) => {
  const channelId = useSelector((state) => state.channel.channelId);
  const [user] = useAuthState(auth);

  return (
    <div className="flex  p-1 my-2.5 mr-2 ml-4 items-center hover:bg-[#32354b] rounded-md group">
      <div className="">
        <img
          src={photoURL}
          alt=""
          className="h-9 rounded-full cursor-pointer hover:shadow-2xl mr-3"
        />
      </div>
      <div className="">
        <div className="space-x-2">
          <span className="font-medium text-sm hover:underline cursor-pointer text-[#f3f4f5]">
            {name}
          </span>
          <span className="text-[#72767d] text-xs">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </div>
        <p className="text-[#dcddde]">{message}</p>
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
          <TrashIcon className="h-5 cursor-pointer hidden group-hover:inline" />
        )}
      </div>
    </div>
  );
};

export default Message;
