import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMyProfile } from "../redux/slices/userSlice";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProjectCard from "../components/ProjectCard";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";
import { PiUsersThreeBold } from "react-icons/pi";
import { GoFileMedia } from "react-icons/go";
import ShowUser from "../components/utils/ShowUser";
import LoadingBar from "react-top-loading-bar";

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const [showTabs, setShowTabs] = useState("posts");

  const handleTabs = (tab) => {
    setShowTabs(tab);
  };

  const [userProfile, setUserProfile] = useState();
  const [progress, setProgress] = useState(0);

  const fetchUserProfile = async (id) => {
    try {
      setProgress(30);
      setProgress(40);
      const res = await axios.get(`user/profile/${id}`);
      setUserProfile(res.data.data);
      setProgress(100);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getMyProfile());
    fetchUserProfile(id);
  }, [id, dispatch]);

  return (
    <div className="bg-dark-1 text-white  w-screen md:w-full h-full flex flex-col  items-center  mb-20 md:mb-10 ">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {userProfile && (
        <ProfileInfo
          id={userProfile._id}
          name={userProfile.name}
          username={
            userProfile?.username ? userProfile.username : userProfile.name
          }
          posts={userProfile.posts?.length}
          followers={userProfile.followers}
          following={userProfile.followings}
          about={userProfile?.about}
          avatar={userProfile.avatar?.url}
          isFollowedByCurrentUser={user?.followers?.some(
            (follower) => follower._id === id
          )}
        />
      )}
      <div className=" w-[90%] bg-dark-3 flex items-center justify-center rounded-md">
        {userProfile && (
          <div className="w-[100%] text-white rounded-lg flex items-center justify-between md:h-24 h-16 ">
            <div
              className={`flex justify-center items-center gap-2  w-40  rounded-md transition-all ease-in-out duration-300 cursor-pointer h-full ${
                showTabs === "posts" ? "bg-primary-500 text-white" : ""
              }`}
              onClick={() => handleTabs("posts")}
            >
              <div
                className={`text-sm md:text-xl hidden md:block font-bold ${
                  showTabs === "posts" ? "text-dark-3" : "text-light-3"
                }`}
              >
                <GoFileMedia />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm md:text-xl font-bold">
                  {userProfile.posts?.length > 0
                    ? userProfile.posts?.length
                    : 0}
                </p>
                <p
                  className={` font-medium text-xs md:text-sm ${
                    showTabs === "posts" ? " text-dark-3" : "text-light-3"
                  }`}
                >
                  Posts
                </p>
              </div>
            </div>
            <div
              className={`flex justify-center items-center gap-2  w-40 p-1 rounded-md transition-all ease-in-out duration-300 cursor-pointer h-full ${
                showTabs === "followers" ? "bg-primary-500 text-white " : ""
              } `}
              onClick={() => handleTabs("followers")}
            >
              <div
                className={`hidden md:block text-xl md:text-2xl  font-bold ${
                  showTabs === "followers" ? "text-dark-3" : "text-light-3"
                }`}
              >
                <PiUsersThreeBold />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl font-bold">
                  {userProfile.followers?.length > 0
                    ? userProfile.followers?.length
                    : 0}
                </p>
                <p
                  className={` font-medium text-xs md:text-sm ${
                    showTabs === "followers" ? " text-dark-3" : "text-light-3"
                  }`}
                >
                  Followers
                </p>
              </div>
            </div>
            <div
              className={`flex justify-center items-center gap-2  w-40 p-1 rounded-md transition-all ease-in-out duration-300 cursor-pointer h-full  ${
                showTabs === "followings" ? "bg-primary-500 text-white " : ""
              }`}
              onClick={() => handleTabs("followings")}
            >
              <div
                className={`hidden md:block text-xl md:text-2xl   font-bold ${
                  showTabs === "followings" ? "text-dark-3" : "text-light-3"
                }`}
              >
                {" "}
                <PiUsersThreeBold />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm md:text-xl font-bold">
                  {userProfile.followings?.length > 0
                    ? userProfile.followings?.length
                    : 0}
                </p>
                <p
                  className={` font-medium text-xs md:text-sm ${
                    showTabs === "followings" ? "text-dark-3" : "text-light-3"
                  }`}
                >
                  Followings
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={` md:w-[60%]  flex flex-col justify-center items-center  p-6 gap-7 ${
          showTabs === "posts" ? "block" : "hidden"
        } `}
      ></div>{" "}
      <div className=" w-[70%] flex flex-col justify-center items-center ">
        {userProfile?.posts?.length > 0 ? (
          <>
            {userProfile &&
              userProfile.posts?.map((pr) => {
                return (
                  <ProjectCard
                    key={pr._id}
                    id={pr._id}
                    owner={userProfile.name}
                    avatar={userProfile.avatar?.url}
                    description={pr.description}
                    image={pr.image[0].url}
                    likes={pr.likes}
                    comments={pr.comments}
                    ownerId={pr.owner}
                    createdAt={pr.createdAt}
                  />
                );
              })}
          </>
        ) : (
          <div>{userProfile && "There is no projects"}</div>
        )}
      </div>
      <div
        className={`text-white mt-10 bg-dark-2 rounded-md p-6 overflow-y-scroll h-80 md:w-[80%] w-[90%] flex flex-col items-center gap-6 ${
          showTabs === "followings" ? "block" : "hidden"
        }`}
      >
        {userProfile && userProfile.followings?.length > 0
          ? userProfile.followings?.map((item) => {
              return (
                <ShowUser
                  key={item.id}
                  name={item.name}
                  avatar={item.avatar.url}
                  id={item._id}
                  username={item.username ? item.username : item.name}
                  view="View"
                />
              );
            })
          : "No Followings Yet"}
      </div>
      <div
        className={`text-white mt-10 bg-dark-2 rounded-md p-6 overflow-y-scroll h-80 md:w-[80%] w-[90%] flex flex-col items-center gap-6 ${
          showTabs === "followers" ? "block" : "hidden"
        }`}
      >
        {userProfile && userProfile.followers?.length > 0
          ? userProfile.followers?.map((item) => {
              return (
                <ShowUser
                  key={item.id}
                  name={item.name}
                  avatar={item.avatar.url}
                  id={item._id}
                  username={item.username ? item.username : item.name}
                  view="View"
                />
              );
            })
          : "No Followings Yet"}
      </div>
    </div>
  );
}

export default Profile;
