/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../../utils/constants";
import { removeUser } from "../../../utils/userSlice";

import {
  FaUserFriends,
  FaUserPlus,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const user = useSelector((store) => store.user);
  const request=useSelector(store=>store.requests);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8 shadow-sm">

      {/* Left */}
      <div className="flex-1">
        <Link
          to="/feed"
          className="text-2xl font-bold text-primary"
        >
          DevTinder ❤️
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Search */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search developers..."
            className="input input-bordered w-64"
          />
        </div>

        {/* Theme Toggle */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={() =>
            setTheme(
              theme === "light"
                ? "dark"
                : "light"
            )
          }
        >
          {theme === "light" ? (
            <FaMoon size={18} />
          ) : (
            <FaSun size={18} />
          )}
        </button>

        {/* Connection Requests */}
        <Link
          to="/connectionRequests"
          className="btn btn-ghost btn-circle"
        >
          <div className="indicator">

            <FaUserPlus size={20} />

            {/* Dynamic count later */}
            <span className="badge badge-primary badge-xs indicator-item">
              {request?.length}
            </span>

          </div>
        </Link>

        {/* My Connections */}
        <Link
          to="/myConnections"
          className="btn btn-ghost btn-circle"
        >
          <FaUserFriends size={20} />
        </Link>

        {/* Username */}
        {user && (
          <span className="hidden lg:block font-medium">
            Hi, {user.firstName}
          </span>
        )}

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

              <img
                alt="profile"
                src={
                  user?.photoUrl ||
                  "https://picsum.photos/100"
                }
              />

            </div>
          </div>

          <ul
            tabIndex={0}
            className="
              menu
              menu-sm
              dropdown-content
              bg-base-100
              rounded-box
              z-[1]
              mt-3
              w-56
              p-2
              shadow-xl
            "
          >
            <li>
              <Link to="/profile">
                👤 Profile
              </Link>
            </li>

            <li>
              <Link to="/myConnections">
                🤝 My Connections
              </Link>
            </li>

            <li>
              <Link to="/connectionRequests">
                📩 Connection Requests
              </Link>
            </li>

            <li>
              <a onClick={handleLogout}>
                <MdLogout size={18} />
                Logout
              </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Navbar;