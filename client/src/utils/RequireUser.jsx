import React from "react";
import { useCookies } from "react-cookie";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Sidebar from "../components/utils/Sidebar";
import Suggestions from "../components/utils/Suggestions";
import Navbar from "../components/Navbar";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { RiImageAddLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import axios from "./axiosclient";
import { toast } from "react-hot-toast";

function RequireUser() {
  const token = localStorage.getItem("token");

  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  async function logout() {
    try {
      const res = await axios.get("/auth/logout");
      if (res.data.success) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  }

  return token ? (
    <div>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <div className=" block md:hidden bg-dark-2 bg-opacity-75 backdrop-blur-lg w-full z-20 fixed bottom-0 left-0  h-16 mb-2">
          <div className="w-full h-full flex items-center justify-between px-4 transition-all ease-in-out duration-300 ">
            <Link
              to={"/"}
              className={`p-3 rounded-lg ${
                pathname === "/"
                  ? "bg-primary-500 bg-opacity-75 backdrop-blur-lg "
                  : ""
              }`}
            >
              <AiOutlineHome
                className={`text-xl ${
                  pathname === "/" ? "text-dark-3" : "text-primary-500"
                } `}
              />
            </Link>
            <Link
              to={"/search"}
              className={`p-3 rounded-lg ${
                pathname === "/search"
                  ? "bg-primary-500 bg-opacity-75 backdrop-blur-lg "
                  : ""
              }`}
            >
              <AiOutlineSearch
                className={`text-xl ${
                  pathname === "/search" ? "text-dark-3" : "text-primary-500"
                } `}
              />
            </Link>
            <Link
              to={"/activity"}
              className={`p-3 rounded-lg ${
                pathname === "/activity"
                  ? "bg-primary-500 bg-opacity-75 backdrop-blur-lg "
                  : ""
              }`}
            >
              <AiOutlineHeart
                className={`text-xl ${
                  pathname === "/activity" ? "text-dark-3" : "text-primary-500"
                } `}
              />
            </Link>
            <Link
              to={"/post-post"}
              className={`p-3 rounded-lg ${
                pathname === "/post-post"
                  ? "bg-primary-500 bg-opacity-75 backdrop-blur-lg "
                  : ""
              }`}
            >
              <RiImageAddLine
                className={`text-xl ${
                  pathname === "/post-post" ? "text-dark-3" : "text-primary-500"
                } `}
              />
            </Link>
            <Link
              to={`/profile/${user?._id}`}
              className={`p-3 rounded-lg ${
                pathname === `/profile/${user?._id}`
                  ? "bg-primary-500 bg-opacity-75 backdrop-blur-lg "
                  : ""
              }`}
            >
              <AiOutlineUser
                className={`text-xl ${
                  pathname === `/profile/${user?._id}`
                    ? "text-dark-3"
                    : "text-primary-500"
                } `}
              />
            </Link>
            <button onClick={logout}>
              <FiLogOut className="text-xl text-primary-500" />
            </button>
          </div>
        </div>
        <div className="flex-grow  ">
          <Outlet />
        </div>
        <Suggestions />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireUser;
