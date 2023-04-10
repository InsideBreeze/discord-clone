import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../../assets/upload_image.svg";
import serverModalReducer, {
  toggleModal,
} from "../../reducers/serverModalReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function MyModal() {
  const isOpen = useSelector((state) => state.serverModalState.open);
  const inputRef = useRef(null)
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [serverName, setServerName] = useState(`${user?.displayName}'s Server`);

  const [selectedFile, setSelectedFile] = useState('')

  function closeModal() {
    dispatch(toggleModal(false));
  }

  function openModal() {
    dispatch(toggleModal(true));
  }

  const onUploadImage = (event) => {
    // todo
    const reader = new FileReader()
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0])
    }
    reader.onload = (e) => {
      setSelectedFile(e.target.result)
    }
  }

  const onCreateServer = async () => {
    //To Do
    const serverDocRef = await addDoc(collection(db, 'servers'),
      {
      createdAt: serverTimestamp(),
      creatorId: user?.uid,
      serverName,
    })

    if (selectedFile) {
      const imageRef = ref(storage, `servers/${serverDocRef.id}/image`)
      await uploadString(imageRef, selectedFile, 'data_url')
      const downloadUrl = await getDownloadURL(imageRef)
      await updateDoc(serverDocRef, {
        serverImage: downloadUrl
      })
    }

    dispatch(toggleModal(false));
    setSelectedFile('')


  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white text-center align-middle shadow-2xl transition-all">
                  <div className="px-6 pt-6">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      Create your server
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-base text-gray-500">
                        Give your new server a personality with a name and an
                        icon. You can always change it later.
                      </p>
                    </div>

                    <div className="flex items-center justify-center my-3">
                      <img src={
                        selectedFile || 
                        uploadImage
                      } className="w-14 h-14 rounded-full" onClick={() => inputRef.current.click()}/>
                      <input type="file" className="hidden" ref={inputRef} accept=".jpg, .png, .gif" onChange={onUploadImage}/>
                    </div>
                    <div>
                      <p className="text-start text-sm font-semibold text-gray-800">
                        SERVER NAME
                      </p>
                      <input
                        onChange={(e) => setServerName(e.target.value)}
                        className="h-10 bg-[#d9d9d9] w-full px-2 py-2 rounded-md outline-none my-2"
                        value={serverName}
                      />
                      <p className="text-xs text-start text-gray-500">
                        By creating a server, you agree to Discord's{" "}
                        <span className="text-blue-500 cursor-pointer">
                          Community Guidelines
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-5 h-20 bg-gray-100 w-full  items-center px-4">
                    <button
                      className="font-semibold"
                      onClick={() => dispatch(toggleModal(false))}
                    >
                      Back
                    </button>
                    <button className="bg-discord_blurple px-5 py-2 rounded-md text-white" onClick={onCreateServer}>
                      Create
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
