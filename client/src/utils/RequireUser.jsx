import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/utils/Sidebar";
import Suggestions from "../components/utils/Suggestions";
import Navbar from "../components/Navbar";

function RequireUser() {
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  return token ? (
    <>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <div className=" block md:hidden bg-dark-1 bg-opacity-60 backdrop-blur-lg w-full z-20 fixed bottom-0 left-0  h-28 mb-2">
          <div>Aman</div>
        </div>
        <div className="flex-grow ">
          <Outlet />
        </div>
        <Suggestions />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireUser;
