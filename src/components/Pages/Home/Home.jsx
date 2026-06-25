/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../../ReusableComponents/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../utils/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user=useSelector(store=>store.user)
  const fetchUser = async () => {
    if(user) return;
    try {

      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (err) {
      if (err.status === 401) {
        return navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      
    </>
  );
};

export default Home;
