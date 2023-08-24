import React, { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
} from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosclient";
import { toast } from "react-hot-toast";

function Sidebar() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setActive(true);
  }, [user]);

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
  return (
    <div
      className={` hidden bg-dark-2 w-[18%] h-[100vh]  text-white md:flex flex-col justify-around items-center md:text-[1.2rem] sticky top-0 right-0 overflow-y-scroll transition-all ease-in-out  duration-300 font-medium  ${
        active ? "w-[18%]" : "w-[5%]"
      } `}
    >
      <button
        className={`relative  hover:text-light-4 text-primary-500 font-extrabold text-2xl  ${
          active ? "left-20" : "left-5"
        }`}
        onClick={() => {
          setActive(!active);
        }}
      >
        {active ? <AiOutlineDoubleLeft /> : <AiOutlineDoubleRight />}
      </button>
      <Link
        to="/"
        className="flex items-center hover:bg-primary-500 w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300 hover:translate-x-2 "
      >
        <div
          className="flex items-center w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300 "
          onClick={() => {
            setActive(!active);
          }}
        >
          <div>
            <AiOutlineHome className="text-2xl" />
          </div>
          <div className={`${active ? "" : "hidden"}`}>Home</div>
        </div>
      </Link>

      <Link
        to="/search"
        className="flex items-center hover:bg-primary-500 w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300 hover:translate-x-2"
      >
        <div className="flex items-center w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300">
          <div>
            <AiOutlineSearch className="text-2xl" />
          </div>
          <div className={`${active ? "" : "hidden"}`}>Search</div>
        </div>
      </Link>

      <Link
        to="/activity"
        className="flex items-center hover:bg-primary-500 w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300 hover:translate-x-2"
      >
        <div className="flex items-center w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300">
          <div>
            <AiOutlineHeart className="text-2xl" />
          </div>
          <div className={`${active ? "" : "hidden"}`}>Activity</div>
        </div>
      </Link>

      <Link
        to="/post-post"
        className="flex items-center hover:bg-primary-500 w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300 hover:translate-x-2"
      >
        <div className="flex items-center w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300">
          <div>
            <RiImageAddLine className="text-2xl" />
          </div>
          <div className={`${active ? "" : "hidden"}`}>Post</div>
        </div>
      </Link>

      {/* <Link
        to="/community"
        className="flex items-center hover:bg-primary-500 w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300 hover:translate-x-2"
      >
        <div className="flex items-center w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300">
          <div>
            <FaUserFriends className="text-2xl" />
          </div>
          <div className={`${active ? "" : "hidden"}`}>Community</div>
        </div>
      </Link> */}

      <Link
        to={`/profile/${user?._id}`}
        className="flex items-center hover:bg-primary-500 w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300 hover:translate-x-2"
      >
        <div className="flex items-center w-[75%] justify-start gap-4 rounded-lg h-16 px-2 transition-all ease-in-out duration-300">
          <div>
            <AiOutlineUser className="text-2xl" />
          </div>
          <div className={`${active ? "" : "hidden"}`}>Profile</div>
        </div>
      </Link>

      <button
        className="flex items-center w-[75%] justify-start gap-4 rounded-lg h-16 px-4 transition-all ease-in-out duration-300 active:border-2 border-primary-500 active:scale-95 "
        onClick={logout}
      >
        <div>
          <FiLogOut className="text-2xl" />
        </div>
        <div className={`${active ? "" : "hidden"}`}>Logout</div>
      </button>
    </div>
  );
}

export default Sidebar;
