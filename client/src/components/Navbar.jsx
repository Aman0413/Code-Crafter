import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="bg-dark-2 text-white w-full px-5 h-20 py-2 flex justify-center items-center sticky ">
      <div className="flex items-center w-full justify-between ">
        <Link to={"/"}>
          {" "}
          <h1 className="md:text-2xl font-bold cursor-pointer">CodeCrafter</h1>
        </Link>

        <Avatar src={user?.avatar?.url} size="45" round />
      </div>
    </div>
  );
}

export default Navbar;
