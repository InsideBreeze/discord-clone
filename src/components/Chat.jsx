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
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

const Chat = () => {
  const channelName = useSelector((state) => state.channel.channelName);
  const channelId = useSelector((state) => state.channel.channelId);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const [user] = useAuthState(auth);

  const q =
    channelId &&
    query(
      collection(doc(collection(db, "channels"), channelId), "messages"),
      orderBy("timestamp", "asc")
    );
  const [messages] = useCollection(q);

  // scroll to bottom ref, so make the lastest message visible
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const message = inputRef.current.value;
    console.log(message);
    if (message) {
      inputRef.current.value = "";
      await addDoc(
        collection(doc(collection(db, "channels"), channelId), "messages"),
        {
          timestamp: serverTimestamp(),
          message,
          email: user?.email,
          name: user?.displayName,
          photoURL: user?.photoURL,
        }
      );
      scrollToBottom();
    }
  };
  return (
    <div className="h-screen bg-[#313338] flex flex-col overflow-y-scroll scrollbar-hide">
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
      <main className="flex-grow">
        {messages?.docs.map((doc) => {
          const { timestamp, name, photoURL, email, message } = doc.data();
          return (
            <Message
              message={message}
              key={doc.id}
              id={doc.id}
              name={name}
              timestamp={timestamp}
              email={email}
              photoURL={photoURL}
            />
          );
        })}
        {/* for reference */}
        <div className="bt-4" ref={bottomRef}></div>
      </main>
      <div className="flex p-2.5 items-center space-x-1 mb-2 mx-4 bg-[#202225] rounded-lg text-gray-300">
        <PlusCircleIcon className="h-7 hover:text-gray-100 cursor-pointer" />
        <form className="flex-grow" onSubmit={sendMessage}>
          <input
            type="text"
            className="w-full bg-transparent focus:outline-none text-[#dcddde]"
            placeholder={
              channelName
                ? ` Message #${channelName}`
                : "Select a channel to chat"
            }
            disabled={channelName === null}
            ref={inputRef}
          />
          <button hidden type="submit">
            send
          </button>
        </form>
        <GifIcon className="h-7 hover:text-gray-100 cursor-pointer" />
        <FaceSmileIcon className="h-7 hover:text-gray-100 cursor-pointer" />
      </div>
    </div>
  );
};

export default Chat;
