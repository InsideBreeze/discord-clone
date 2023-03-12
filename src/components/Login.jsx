import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import google from "../assets/GOOG.svg";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [fieldValues, setFieldValues] = useState({
    email: "",
    password: "",
  });

  console.log(fieldValues);
  const handleChange = (e) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(
      fieldValues.email,
      fieldValues.password
    );
    if (user) {
      navigate("/channels");
    }
  };
  const loginByGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate("/channels"))
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <div className="min-h-screen sm:flex sm:items-center bg-[#313338] sm:justify-center sm:bg-[url('/src/assets/discord_background.jpg')]">
      <div className="w-full h-full text-white sm:w-[480px] flex items-center flex-col space-y-2 bg-[#313338] sm:shadow-2xl sm:rounded-md lg:p-5 lg:pt-2 md:p-3 sm:p-1 md:pt-1">
        <div className="flex justify-center items-center flex-col space-y-2 mt-4 w-full">
          <a href="/">
            <img
              src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b5493894cf60b300587_full_logo_white_RGB.svg"
              alt=""
              className="h-6"
            />
          </a>
          <p className="text-xl font-bold">Welcome back!</p>
          <p className="text-[#b8b9bf]">We're so excited to see you again!</p>
        </div>
        {error && <p className="text-[red]">{error.message}</p>}
        <div
          className="flex py-2 items-center space-x-2 bg-white rounded-xl px-4 cursor-pointer"
          onClick={() => loginByGoogle()}
        >
          <img src={google} className="h-5 w-5" />
          <span className="text-black">Continue with Goolge</span>
        </div>

        <div className="w-full">
          <form className="space-y-2 mx-3">
            <div>
              <label className="text-[#B8C3BF] font-semibold">
                EMAIL
                <span className="text-[red]">
                  <>{" *"}</>
                </span>
              </label>
              <input
                name="email"
                type="email"
                className="w-full focus:outline-none bg-[#1e1f22] h-10"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-[#B8C3BF] font-semibold">
                Password<span className="text-[red]"> *</span>
              </label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                className="w-full focus:outline-none  h-10 bg-[#1e1f22]"
              />
            </div>
            <div className="">
              <p className="text-[#00a8fc] mb-2">Forget your password?</p>
              <button
                className="bg-discord_blurple w-full px-5 py-2 my-3"
                onClick={onLogin}
              >
                Log In
              </button>

              <p className="mt-2">
                Need an account?{" "}
                <span
                  className="text-[#00a8fc] hover:underline cursor-pointer"
                  href=""
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
