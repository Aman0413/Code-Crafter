import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

function ShowUser({
  name,
  username,
  avatar,
  id,
  isFollowedByCurrentUser,
  view,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <div
      className="flex w-full justify-between cursor-pointer"
      onClick={() => {
        handleClick();
      }}
    >
      <div className="flex items-center gap-2">
        <div>
          <Avatar round size="60" src={avatar} />
        </div>

        <div className="flex flex-col items-start  ">
          <p className="font-bold md:text-xl">{name}</p>
          <p className="font-medium text-xs md:text-base text-gray-1">
            @{username}
          </p>
        </div>
      </div>

      {view ? (
        <button
          className={`flex justify-center items-center  h-11 md:w-28 w-20 p-1 rounded-lg gap-3 font-bold   bg-primary-500 text-white`}
        >
          <p>View</p>
        </button>
      ) : (
        <button
          className={`flex justify-center items-center  h-11 w-20 md:w-28 px-2 py-2 rounded-lg gap-3 font-bold md:text-base text-sm  ${
            isFollowedByCurrentUser
              ? "bg-dark-3 text-primary-500"
              : "bg-primary-500 text-white"
          }`}
        >
          <p>{isFollowedByCurrentUser ? "Unfollow" : "Follow"}</p>
        </button>
      )}
    </div>
  );
}

export default ShowUser;
