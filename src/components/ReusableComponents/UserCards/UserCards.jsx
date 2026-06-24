/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const UserCards = ({ user }) => {
  if (!user) return null;

  const {
    firstName,
    lastName,
    photoUrl,
    about,
    skills,
    age,
  } = user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div
        className="
          relative
          w-[380px]
          h-[650px]
          rounded-3xl
          overflow-hidden
          shadow-2xl
          transition-all
          duration-300
          hover:scale-[1.02]
        "
      >
        <img
          src={
            photoUrl ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43"
          }
          alt={firstName}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-28 left-0 w-full p-6 text-white">
          <h1 className="text-4xl font-bold">
            {firstName} {lastName}
            {age && (
              <span className="ml-2 font-medium">
                {age}
              </span>
            )}
          </h1>

          <p className="mt-3 text-white/90 line-clamp-3">
            {about}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {skills?.map((skill) => (
              <div
                key={skill}
                className="badge badge-primary badge-outline"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
          <button
            className="
              btn
              btn-circle
              btn-error
              btn-lg
              shadow-xl
              hover:scale-110
              transition
            "
          >
            ✕
          </button>

          <button
            className="
              btn
              btn-circle
              btn-success
              btn-lg
              shadow-xl
              hover:scale-110
              transition
            "
          >
            ♥
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCards;