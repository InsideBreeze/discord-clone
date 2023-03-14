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
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { TrashIcon } from "@heroicons/react/24/outline";

const Chat = () => {
  const channelName = useSelector((state) => state.channel.channelName);
  const channelId = useSelector((state) => state.channel.channelId);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const [user] = useAuthState(auth);
  const filePickerRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);

  const q =
    channelId &&
    query(
      collection(doc(collection(db, "channels"), channelId), "messages"),
      orderBy("timestamp", "asc")
    );
  const [messages] = useCollection(q);
  const [showPicker, setShowPicker] = useState(false);

  // scroll to bottom ref, so make the lastest message visible
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSelectEmoji = (e) => {
    inputRef.current.value += e.native;
    setShowPicker(!showPicker);
  };

  // attach file
  const attachFile = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const message = inputRef.current.value.trim();
    if (message || selectedFile) {
      inputRef.current.value = "";

      const docRef = await addDoc(
        collection(doc(collection(db, "channels"), channelId), "messages"),
        {
          timestamp: serverTimestamp(),
          message,
          email: user?.email,
          name: user?.displayName,
          photoURL: user?.photoURL,
        }
      );
      // user attach a image, store it to the firebase and atttach to this message
      if (selectedFile) {
        const imageRef = ref(storage, `images/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(
              doc(db, "channels", channelId, "messages", docRef.id),
              {
                image: downloadURL,
              }
            );
          }
        );
        setSelectedFile(null);
      }

      scrollToBottom();
    }
  };
  return (
    <div className="h-screen  bg-[#313338] flex flex-col overflow-y-scroll scrollbar-hide">
      <header className="flex justify-between p-2.5 border-b border-gray-800 text-gray-300 items-center">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="w-5" />
          <h4 className="font-semibold">
            {channelName ? channelName : "Department of Compute..."}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <BellIcon className="icon hover:text-gray-100" />
          <ChartBarIcon className="icon hover:text-gray-100" />
          <UsersIcon className="icon hover:text-gray-100" />
          <div className="flex bg-[#383a40] rounded-md items-center">
            <input
              type="text"
              className="p-1 text-sm bg-transparent focus:outline-none"
              placeholder="Search"
            />
            <MagnifyingGlassIcon className="w-4 mr-1" />
          </div>
          <InboxIcon className="icon hover:text-gray-100" />
          <QuestionMarkCircleIcon className="icon hover:text-gray-100" />
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {messages?.docs.map((doc) => {
          const { timestamp, name, photoURL, email, message, image } =
            doc.data();
          return (
            <Message
              message={message}
              key={doc.id}
              id={doc.id}
              name={name}
              timestamp={timestamp}
              email={email}
              photoURL={photoURL}
              image={image}
            />
          );
        })}
        {/* for reference */}
        <div className="bt-4" ref={bottomRef}></div>
      </main>

      {/* input */}
      <div className="sticky bottom-3 z-5 flex flex-col  bg-[#383a40] mx-4 divide-gray-700 divide-y my-3 rounded-xl shadow-2xl">
        {selectedFile && (
          <div className="flex justify-start p-5">
            <div className="bg-[#313338] p-3 rounded-xl h-50 w-50">
              <img
                alt=""
                src={selectedFile}
                className="object-contain shadow-xl max-h-40"
              />
            </div>

            <div
              className="ml-1 text-[red] icon p-1"
              onClick={() => {
                setSelectedFile(null);
                filePickerRef.current.value = null; // need this for empty file input
              }}
            >
              <TrashIcon className="w-5 h-5" />
            </div>
          </div>
        )}

        <div className="flex p-1 items-center space-x-1  mx-4 bg-[#383a40] rounded-lg text-gray-300 relative my-3">
          <PlusCircleIcon
            className="cursor-pointer h-7 hover:text-gray-100"
            onClick={() => filePickerRef.current.click()}
          />
          <input
            name=""
            type="file"
            ref={filePickerRef}
            className="hidden"
            disabled={!channelName}
            onChange={attachFile}
          />
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
          <GifIcon className="cursor-pointer h-7 hover:text-gray-100" />
          <FaceSmileIcon
            className="cursor-pointer h-7 hover:text-gray-100"
            onClick={() => setShowPicker(!showPicker)}
          />
        </div>
        <div
          className={`${
            showPicker ? "" : "hidden"
          } absolute right-0 bottom-[57px]`}
        >
          <Picker
            onEmojiSelect={handleSelectEmoji}
            theme="dark"
            data={data}
            onClickOutside={() => showPicker && setShowPicker(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
