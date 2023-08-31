import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyAvatar from "./utils/MyAvatar";

function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className=" w-full bg-dark-3  text-white px-5 h-20 md:h-24 py-2 flex justify-center  items-center sticky border-light-4 border-b-[1px]  ">
      <div className="flex md:px-3 items-center w-full justify-between ">
        <Link to={"/"}>
          {" "}
          <h1 className="md:text-4xl text-xl cursor-pointer font-heading shadow-lg">
            Social
            <span className="text-primary-500 ">Flock</span>
          </h1>
        </Link>

        <Link to={`profile/${user?._id}`}>
          {" "}
          <div className="md:w-14 md:h-14 w-12 h-12  rounded-full ">
            <MyAvatar image={user?.avatar?.url} />
          </div>
          {/* <Avatar src={user?.avatar?.url} size="45" round /> */}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
