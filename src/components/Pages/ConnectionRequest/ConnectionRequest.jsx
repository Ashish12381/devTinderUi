import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { useEffect, useState } from "react";
import { addRequests, removeRequest,} from "../../../utils/requestSlice";

const ConnectionRequest = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    const fetchConnectionsRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/pending", {
          withCredentials: true,
        });

        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.error(err);
        setError(err.response?.data || err.message);
      }
    };

    fetchConnectionsRequests();
  }, [dispatch]);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeRequest(requestId));
      setSuccessMessage(
      status === "accepted"
        ? "Connection request accepted 🎉"
        : "Connection request rejected"
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (err) {
    console.error(err);

    setError(
      err.response?.data || err.message
    );

    setTimeout(() => {
      setError("");
    }, 3000);
  }
};

  if (error) {
    return (
      <div className="flex justify-center mt-20">
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">No Pending Requests 🎉</h1>

        <p className="opacity-70 mt-3">You're all caught up.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      {successMessage && (
  <div className="toast toast-top toast-center z-50">
    <div className="alert alert-success">
      <span>{successMessage}</span>
    </div>
  </div>
)}
{error && (
  <div className="toast toast-top toast-center z-50">
    <div className="alert alert-error">
      <span>{error}</span>
    </div>
  </div>
)}

      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-6xl mx-auto px-5 py-8">
          <h1 className="text-4xl font-bold">Connection Requests</h1>

          <p className="opacity-70 mt-2">
            {requests.length} pending request
            {requests.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Requests */}

      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="space-y-5">
          {requests.map((request) => {
            const user = request.fromUserID;

            return (
              <div
                key={request._id}
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
                  {/* Avatar */}

                  <div className="avatar">
                    <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user.photoUrl} alt={user.firstName} />
                    </div>
                  </div>

                  {/* Info */}

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h2 className="text-2xl font-bold">
                        {user.firstName} {user.lastName}
                      </h2>

                      <div className="badge badge-primary">{user.age} yrs</div>
                    </div>

                    <p className="mt-2 opacity-80">{user.about}</p>

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

                  {/* Actions */}

                  <div className="flex gap-3">
                    <button
                      className="btn btn-error"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>

                    <button
                      className="btn btn-success"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequest;
