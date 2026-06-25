/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { BASE_URL } from "../../../utils/constants";
import { removeUserFromFeed } from "../../../utils/feedSlice";

const UserCards = ({
  user,
  showActions = true,
}) => {

  const dispatch = useDispatch();

  const [exitDirection, setExitDirection] =
    useState(null);

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    about,
    skills,
    age,
  } = user;

  const handleSendRequest = async (
    status,
    userId
  ) => {
    try {

      setExitDirection(
        status === "interested"
          ? "right"
          : "left"
      );

      setTimeout(async () => {

        await axios.post(
          `${BASE_URL}/request/send/${status}/${userId}`,
          {},
          {
            withCredentials: true,
          }
        );

        dispatch(
          removeUserFromFeed(userId)
        );

      }, 280);

    } catch (err) {
      console.error(err);
    }
  };

  return (

    <motion.div
      initial={{
        opacity: 0,
        scale: .9,
        y: 80,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        x:
          exitDirection === "right"
            ? 450
            : -450,
        rotate:
          exitDirection === "right"
            ? 25
            : -25,
        scale: .8,
        transition: {
          duration: .35,
        },
      }}
      transition={{
        duration: .35,
      }}
      className="
      relative
      w-full
      max-w-[390px]
      sm:max-w-[420px]
      md:max-w-[430px]
      "
    >

      <div
        className="
        relative
        h-[560px]
        sm:h-[620px]
        md:h-[670px]
        rounded-[32px]
        overflow-hidden
        shadow-[0_25px_60px_rgba(0,0,0,.35)]
        bg-base-100
        group
        "
      >        {/* Profile Image */}

        <img
          src={
            photoUrl ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=900"
          }
          alt={firstName}
          className="
            w-full
            h-full
            object-cover
            duration-700
            group-hover:scale-110
          "
        />

        {/* Gradient Overlay */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/40
          to-transparent
        "
        />

        {/* Top Badges */}

        <div className="absolute top-5 left-5 right-5 flex justify-between">

          {/* AI Match */}

          <div className="badge badge-success badge-lg gap-2 shadow-lg">

            🟢 94% Match

          </div>

          {/* Online */}

          <div
            className="
            badge
            badge-primary
            badge-lg
            gap-2
            shadow-lg
            "
          >
            <span className="animate-pulse">
              ●
            </span>

            Online
          </div>

        </div>

        {/* Bottom Content */}

        <div
          className="
          absolute
          bottom-0
          left-0
          right-0
          p-6
          text-white
          backdrop-blur-[2px]
          "
        >

          {/* Name */}

          <div className="flex items-center flex-wrap gap-3">

            <h1
              className="
              text-3xl
              sm:text-4xl
              font-black
              "
            >
              {firstName} {lastName}
            </h1>

            {age && (
              <div
                className="
                badge
                badge-neutral
                badge-lg
                "
              >
                {age} yrs
              </div>
            )}

          </div>

          {/* About */}

          <p
            className="
            mt-4
            text-sm
            sm:text-base
            text-white/90
            leading-7
            line-clamp-3
            "
          >
            {about ||
              "Passionate developer looking to build amazing products with like-minded people."}
          </p>

          {/* Skills */}

          <div
            className="
            flex
            flex-wrap
            gap-2
            mt-5
            "
          >

            {skills?.map((skill) => (

              <span
                key={skill}
                className="
                badge
                badge-outline
                badge-primary
                bg-white/10
                backdrop-blur-md
                text-white
                border-white/30
                px-3
                py-3
                "
              >
                {skill}
              </span>

            ))}

          </div>

          {/* Footer */}

          <div
            className="
            flex
            justify-between
            items-center
            mt-6
            "
          >

            <div>

              <p className="text-sm text-white/70">
                Developer
              </p>

              <p className="font-semibold">
                Ready to Connect
              </p>

            </div>

            <div
              className="
              badge
              badge-secondary
              badge-lg
              "
            >
              ⭐ Featured
            </div>

          </div>
                    {/* Action Buttons */}

          {showActions && (
            <div
              className="
              mt-8
              flex
              items-center
              justify-center
              gap-6
              "
            >
              {/* Ignore */}

              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="
                btn
                btn-circle
                btn-error
                w-16
                h-16
                shadow-2xl
                border-4
                border-white/20
                text-3xl
                "
                onClick={() =>
                  handleSendRequest(
                    "ignored",
                    _id
                  )
                }
              >
                ✕

              </motion.button>

              {/* Interested */}

              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="
                btn
                btn-circle
                btn-success
                w-16
                h-16
                shadow-2xl
                border-4
                border-white/20
                text-3xl
                "
                onClick={() =>
                  handleSendRequest(
                    "interested",
                    _id
                  )
                }
              >
                ❤️
              </motion.button>
            </div>
          )}

        </div>

      </div>

      {/* Floating Glow */}

      <div
        className="
        absolute
        -bottom-8
        left-1/2
        -translate-x-1/2
        w-56
        h-10
        bg-primary/20
        blur-3xl
        rounded-full
        -z-10
        "
      />

    </motion.div>
  );
};

export default UserCards;