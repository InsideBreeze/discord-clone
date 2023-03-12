import { Formik, useField } from "formik";
import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth } from "../firebase";

// a little validate by yup schema
const validationSchema = yup.object().shape({
  username: yup.string().required("username is required").min(3).max(10),
  email: yup.string().required("email is required").email(),
  password: yup.string().required("Password is required").min(6).max(50),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "password is not matched")
    .required("Password confirm is required"),
});

const RegisterForm = ({ onSubmit, handleChange, errors, values }) => {
  const navigate = useNavigate();

  const [sendPasswordResetEmail, sending, resetPassowrdError] =
    useSendPasswordResetEmail(auth);
  const showError = (name) => {
    const [, meta] = useField(name);
    return meta.touched && meta.error;
  };

  const onResetPassword = async () => {
    const success = await sendPasswordResetEmail(values.email);
    if (success) {
      alert("Sent resetting password email");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#313338] 
    sm:flex sm:items-center sm:justify-center sm:bg-[url('/src/assets/discord_background.jpg')]"
    >
      <div className="w-full h-full lg:p-5 lg:pt-2 md:p-3 sm:p-1 md:pt-1 flex items-center flex-col space-y-2 sm:w-[480px] bg-[#313338] sm:rounded-md text-white sm:shadow-2xl">
        <div className="flex justify-center items-center flex-col pt-4 w-full">
          <a href="/" className="sm:hidden mb-4">
            <img
              src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b5493894cf60b300587_full_logo_white_RGB.svg"
              alt=""
              className="h-6"
            />
          </a>
          <p className="text-xl font-bold text-white">Create an account</p>
        </div>
        {resetPassowrdError && (
          <p className="text-[red]">{resetPassowrdError.message}</p>
        )}

        <div className="w-full">
          <form className="space-y-2 px-3" onSubmit={onSubmit}>
            <div>
              <label className="text-[#B8c3BF] font-semibold">
                Username
                <span className="text-[red]">{" *"}</span>
              </label>
              <input
                type="username"
                name="username"
                className="w-full focus:outline-none bg-[#1e1f22] h-10"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-[#B8C3BF] font-semibold">
                EMAIL
                <span className="text-[red]">
                  <>{" *"}</>
                </span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full focus:outline-none bg-[#1e1f22] h-10"
                onChange={handleChange}
              />
              {showError("email") && (
                <p className="text-sm text-[red]">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-[#B8C3BF] font-semibold">
                Password<span className="text-[red]"> *</span>
              </label>
              <input
                name="password"
                type="password"
                className="w-full focus:outline-none  h-10 bg-[#1e1f22]"
                onChange={handleChange}
              />
              {showError("password") && (
                <p className="text-[red] text-sm">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="text-[#B8C3BF] font-semibold">
                Password Confirm<span className="text-[red]"> *</span>
              </label>
              <input
                type="password"
                name="password_confirm"
                className="w-full focus:outline-none  h-10 bg-[#1e1f22]"
                onChange={handleChange}
              />
              {showError("password_confirm") && (
                <p className="text-[red] text-sm">{errors.password_confirm}</p>
              )}
            </div>
            <div className="">
              <p
                className="text-[#00a8fc] mb-2 text-sm cursor-pointer hover:underline"
                onClick={() => onResetPassword()}
              >
                Forget your password?
              </p>
              <button
                className="bg-discord_blurple w-full px-5 py-2 my-3 text-white hover:bg-blue-500"
                type="submit"
              >
                Register
              </button>
              <p
                className="text-[#00a8fc] hover:underline cursor-pointer text-sm"
                href=""
                onClick={() => navigate("/login")}
              >
                Already has an account?
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };

  const navigate = useNavigate();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile] = useUpdateProfile(auth);

  const onSubmit = async ({ username, email, password }) => {
    const user = await createUserWithEmailAndPassword(email, password);
    if (user) {
      // give the new user a default avatar
      // 'random' number from 0-5
      const random = Math.floor(Math.random() * 6);
      await updateProfile({
        displayName: username,
        // steal from discord
        // https://old.reddit.com/r/discordapp/comments/jlztdo/fun_fact_default_avatar_depends_on_your/
        photoURL: `https://cdn.discordapp.com/embed/avatars/${random}.png`,
      });
      navigate("/channels");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, handleChange, errors }) => (
        <RegisterForm
          onSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
      )}
    </Formik>
  );
};

export default Register;
