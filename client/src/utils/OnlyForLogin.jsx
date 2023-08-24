import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function OnlyIfNotLogin() {
  const token = localStorage.getItem("token");

  console.log("OnlyIfNotLogin", token);
  return token ? <Navigate to="/" /> : <Outlet />;
}

export default OnlyIfNotLogin;
