import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../../../utils/feedSlice";
import UserCards from "../../ReusableComponents/UserCards/UserCards";
import { AnimatePresence, motion } from "framer-motion";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || !feed.users) return null;

  if (feed.users.length === 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center px-5">

        <motion.div
          initial={{ opacity: 0, scale: .8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >

          <div className="text-8xl mb-6">
            🎉
          </div>

          <h1 className="text-5xl font-bold">
            No More Profiles
          </h1>

          <p className="mt-4 opacity-70 text-lg">
            You've explored everyone nearby.
          </p>

          <button
            className="btn btn-primary mt-8"
            onClick={getFeed}
          >
            Refresh Feed
          </button>

        </motion.div>

      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-200 via-base-100 to-base-200">

      {/* Background Blur */}

      <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      {/* Header */}

      <div className="pt-8">

        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-4xl md:text-5xl font-black"
        >
          Discover Developers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
          className="text-center opacity-70 mt-3"
        >
          Swipe right if interested ❤️
        </motion.p>

      </div>

      {/* Counter */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center mt-6"
      >
        <div className="badge badge-primary badge-lg px-5 py-4">
          {feed.users.length} Developers Available
        </div>
      </motion.div>

      {/* Card */}

      <div className="flex justify-center items-center py-10 px-4">

        <AnimatePresence mode="wait">

          <motion.div
            key={feed.users[0]._id}
            layout
          >
            <UserCards
              user={feed.users[0]}
              showActions={true}
            />
          </motion.div>

        </AnimatePresence>

      </div>

      {/* Footer Hint */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .5 }}
        className="pb-8"
      >

        <p className="text-center opacity-50 text-sm">
          ❤️ Interested &nbsp;&nbsp;&nbsp;&nbsp;
          ❌ Ignore
        </p>

      </motion.div>

    </div>
  );
};

export default Feed;