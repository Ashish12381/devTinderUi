/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../../ReusableComponents/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
