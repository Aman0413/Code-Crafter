import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className=" w-full bg-dark-3  text-white px-5 h-20 py-2 flex justify-center items-center sticky border-light-4 border-b-[1px]  ">
      <div className="flex items-center w-full justify-between ">
        <Link to={"/"}>
          {" "}
          <h1 className="md:text-2xl font-bold cursor-pointer">CodeCrafter</h1>
        </Link>

        <Link to={`profile/${user?._id}`}>
          {" "}
          <Avatar src={user?.avatar?.url} size="45" round />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
