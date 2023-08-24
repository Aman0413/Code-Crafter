import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/utils/Sidebar";
import Suggestions from "../components/utils/Suggestions";
import Navbar from "../components/Navbar";

function RequireUser() {
  // const [cookies, setCookie] = useCookies();
  // const user = cookies.token;
  const token = localStorage.getItem("token");

  return token ? (
    <>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <div className="flex-grow">
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
