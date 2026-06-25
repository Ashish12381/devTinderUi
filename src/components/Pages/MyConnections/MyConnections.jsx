import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { addConnections } from "../../../utils/connectionSlice";
import { useEffect, useState } from "react";

const MyConnections = () => {
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const connections = useSelector(
    (store) => store.connections
  );

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(
          BASE_URL + "/user/connections",
          {
            withCredentials: true,
          }
        );

        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data || err.message
        );
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (error) {
    return (
      <div className="flex justify-center mt-20">
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!connections) return null;

  const filteredConnections = connections.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  if (filteredConnections.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">
          No Connections Found
        </h1>

        <p className="opacity-70 mt-3">
          Start connecting with amazing developers 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">

      {/* Header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-5 py-8">

          <h1 className="text-4xl font-bold">
            My Connections
          </h1>

          <p className="opacity-70 mt-2">
            {connections.length} connection
            {connections.length > 1 ? "s" : ""}
          </p>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Search connections..."
              className="input input-bordered w-full max-w-md"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Connections List */}
      <div className="max-w-6xl mx-auto px-5 py-8">

        <div className="space-y-5">

          {filteredConnections.map((user) => (
            <div
              key={user._id}
              className="
                bg-base-100
                rounded-3xl
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                p-5
              "
            >
              <div className="flex flex-col md:flex-row gap-5 items-center">

                {/* Profile Image */}
                <div className="avatar">
                  <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.photoUrl}
                      alt={user.firstName}
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">

                  <div className="flex flex-col md:flex-row md:items-center gap-2">

                    <h2 className="text-2xl font-bold">
                      {user.firstName}{" "}
                      {user.lastName}
                    </h2>

                    <div className="badge badge-primary">
                      {user.age} yrs
                    </div>
                  </div>

                  <p className="mt-2 opacity-80">
                    {user.about}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    {user.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="badge badge-outline badge-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">

                  {/* <button className="btn btn-outline btn-primary">
                    View Profile
                  </button> */}

                  <button className="btn btn-primary">
                    Message
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default MyConnections;