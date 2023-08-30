import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { GoFileMedia } from "react-icons/go";
import { PiUsersThreeBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosclient";
import { getMyProfile } from "../../redux/slices/userSlice";
import MyAvatar from "../utils/MyAvatar";

function ProfileInfo({
  id,
  name,
  username,
  about,
  posts,
  followers,
  following,
  avatar,
  isFollowedByCurrentUser,
}) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const followUnfollowUser = async () => {
    try {
      const res = await axios.post("user/userProfile", {
        userId: id,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(getMyProfile());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="text-white w-full      md:w-full p-6 overflow-x-hidden">
      {/* top profile section */}
      <div className="flex w-full justify-between items-center p-2  md:gap-0">
        <div className="flex items-center gap-3">
          <div className="md:w-32 w-20 rounded-full bg-red-500">
            <img src={avatar} alt={name} className="w-full rounded-full" />
          </div>
          <div>
            <p className="md:text-2xl font-extrabold">{name}</p>
            <p className="text-gray-1 font-medium">@{username}</p>
          </div>
        </div>

        {user?._id === id ? (
          <button
            className="flex justify-center items-center bg-dark-3 h-6 md:h-11 w-20 md:w-28 px-2 py-2 rounded-lg gap-3 font-bold "
            onClick={() => {
              navigate("/profile/edit");
            }}
          >
            <p className="text-primary-500 font-bold text-sm md:text-xl">
              <FiEdit />
            </p>
            <p className="font-bold text-sm md:text-[1.2rem]">Edit</p>
          </button>
        ) : (
          <button
            className={`flex justify-center items-center h-8 md:h-11 w-20 md:w-28 px-2 py-2 rounded-lg gap-4 font-bold text-sm md:text-base   ${
              isFollowedByCurrentUser
                ? "bg-dark-3 text-primary-500"
                : "bg-primary-500 text-white"
            }`}
            onClick={followUnfollowUser}
          >
            <p>{isFollowedByCurrentUser ? "Unfollow" : "Follow"}</p>
          </button>
        )}
      </div>

      {/* about me section */}
      <div className=" w-[50%]  p-3 ">
        <p>{about}</p>
      </div>

      {/* horizontal line */}
      <div className="w-full flex justify-center items-center">
        <div className="w-[80%] h-[1px] bg-gray-1 my-10 rounded-lg"></div>
      </div>
    </div>
  );
}

export default ProfileInfo;
