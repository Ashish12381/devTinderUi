/* eslint-disable no-unused-vars */

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaCode, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addUser } from "../../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedInForm, setIsLoggedInForm] = useState(true);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrors("");

      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response.data));

      navigate("/feed");
    } catch (err) {
      setErrors(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setErrors("");

      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response.data.data));

      navigate("/feed");
    } catch (err) {
      setErrors(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10">

      <div className="container mx-auto min-h-screen px-6">

        <div className="grid lg:grid-cols-2 min-h-screen items-center gap-16">

          {/* LEFT SECTION */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="space-y-8">

              <div className="flex items-center gap-3">

                <div className="bg-primary text-primary-content p-4 rounded-2xl">
                  <FaHeart size={34} />
                </div>

                <h1 className="text-6xl font-black">
                  DevTinder
                </h1>

              </div>

              <h2 className="text-5xl font-bold leading-tight">
                Find your
                <span className="text-primary">
                  {" "}Perfect{" "}
                </span>
                Developer Match.
              </h2>

              <p className="text-xl opacity-70 leading-9 max-w-xl">

                Connect with talented developers,
                build meaningful professional
                relationships and discover amazing
                opportunities around the world.

              </p>

              <div className="grid grid-cols-3 gap-5 pt-6">

                <div className="stat bg-base-100 rounded-2xl shadow-xl">

                  <div className="stat-value text-primary">
                    10K+
                  </div>

                  <div className="stat-title">
                    Developers
                  </div>

                </div>

                <div className="stat bg-base-100 rounded-2xl shadow-xl">

                  <div className="stat-value text-secondary">
                    6K+
                  </div>

                  <div className="stat-title">
                    Connections
                  </div>

                </div>

                <div className="stat bg-base-100 rounded-2xl shadow-xl">

                  <div className="stat-value">
                    120+
                  </div>

                  <div className="stat-title">
                    Companies
                  </div>

                </div>

              </div>

            </div>

          </motion.div>

          {/* RIGHT SECTION */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >

            <div
              className="
              card
              bg-base-100/90
              backdrop-blur-xl
              shadow-2xl
              border
              border-base-300
              w-full
              max-w-md
              "
            >

              <div className="card-body p-8">

                <div className="text-center">

                  <div className="inline-flex bg-primary text-primary-content p-4 rounded-full mb-4">
                    <FaCode size={24} />
                  </div>

                  <h2 className="text-4xl font-bold">

                    {isLoggedInForm
                      ? "Welcome Back"
                      : "Create Account"}

                  </h2>

                  <p className="opacity-70 mt-2">

                    {isLoggedInForm
                      ? "Login to continue your journey."
                      : "Join thousands of developers."}

                  </p>

                </div>

                {/* ===== FORM STARTS HERE ===== */}
                {/* First Name & Last Name */}

{!isLoggedInForm && (
  <motion.div
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-4 mt-8"
  >
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-semibold">
          First Name
        </span>
      </div>

      <input
        type="text"
        placeholder="John"
        className="input input-bordered w-full"
        value={firstName}
        onChange={(e) =>
          setFirstName(e.target.value)
        }
      />
    </label>

    <label className="form-control w-full">
      <div className="label">
        <span className="label-text font-semibold">
          Last Name
        </span>
      </div>

      <input
        type="text"
        placeholder="Doe"
        className="input input-bordered w-full"
        value={lastName}
        onChange={(e) =>
          setLastName(e.target.value)
        }
      />
    </label>
  </motion.div>
)}

{/* Email */}

<div className="form-control w-full mt-5">

  <div className="label">
    <span className="label-text font-semibold">
      Email Address
    </span>
  </div>

  <label className="input input-bordered flex items-center gap-2">

    📧

    <input
      type="email"
      className="grow"
      placeholder="john@gmail.com"
      value={emailId}
      onChange={(e) =>
        setEmailId(e.target.value)
      }
    />

  </label>

</div>

{/* Password */}

<div className="form-control w-full mt-5">

  <div className="label">
    <span className="label-text font-semibold">
      Password
    </span>
  </div>

  <label className="input input-bordered flex items-center">

    🔒

    <input
      type={
        showPassword
          ? "text"
          : "password"
      }
      className="grow ml-2"
      placeholder="Enter Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={() =>
        setShowPassword(
          !showPassword
        )
      }
    >
      {showPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </button>

  </label>

</div>

{/* Error */}

{errors && (
  <div className="alert alert-error mt-6">

    <span>{errors}</span>

  </div>
)}

{/* Submit */}

<button
  className="
      btn
      btn-primary
      btn-lg
      w-full
      mt-8
  "
  disabled={loading}
  onClick={() =>
    isLoggedInForm
      ? handleLogin()
      : handleSignUp()
  }
>

  {loading ? (
    <>
      <span className="loading loading-spinner loading-sm"></span>

      Please wait...
    </>
  ) : isLoggedInForm ? (
    "Login"
  ) : (
    "Create Account"
  )}

</button>

<div className="divider my-8">
  OR
</div>

<button
  className="
      btn
      btn-outline
      btn-primary
      w-full
  "
  onClick={() => {
    setErrors("");

    setIsLoggedInForm(
      !isLoggedInForm
    );
  }}
>

  {isLoggedInForm
    ? "Create a new account"
    : "Already have an account?"}

</button>
                {/* Footer */}

                <div className="text-center mt-8">

                  <p className="text-sm opacity-60">
                    By continuing, you agree to our
                  </p>

                  <div className="flex justify-center gap-2 mt-2 text-sm">

                    <button className="link link-hover">
                      Terms
                    </button>

                    <span>•</span>

                    <button className="link link-hover">
                      Privacy
                    </button>

                  </div>

                </div>

              </div>
            </div>

          </motion.div>

        </div>

      </div>

      {/* Background Decorations */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        {/* Top Left */}

        <div
          className="
          absolute
          -top-24
          -left-24
          w-80
          h-80
          rounded-full
          bg-primary/20
          blur-3xl
        "
        />

        {/* Bottom Right */}

        <div
          className="
          absolute
          -bottom-24
          -right-24
          w-96
          h-96
          rounded-full
          bg-secondary/20
          blur-3xl
        "
        />

        {/* Center */}

        <div
          className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-72
          h-72
          rounded-full
          bg-accent/10
          blur-3xl
        "
        />

      </div>

    </div>
  );
};

export default Login;