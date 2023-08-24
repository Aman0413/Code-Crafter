import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function OnlyIfNotLogin() {
  // const [cookies, setCookie] = useCookies();
  // const user = cookies.token;

  const token = localStorage.getItem("token");
  console.log("TOKEN", token);

  return token ? <Navigate to="/" /> : <Outlet />;
}

export default OnlyIfNotLogin;
