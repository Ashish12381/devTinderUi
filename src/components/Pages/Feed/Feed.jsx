import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../../../utils/feedSlice";
import UserCards from "../../ReusableComponents/UserCards/UserCards";

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
  return (
    <div>
      {feed && (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-base-200">
          <UserCards user={feed.users[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;
