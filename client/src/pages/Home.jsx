import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/slices/userSlice";
import ProjectCard from "../components/ProjectCard";
import Story from "../components/Story";
import ShowUser from "../components/utils/ShowUser";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

function Home() {
  const dispatch = useDispatch();
  const [suggestedUser, setSuggestedUser] = useState([]);
  const { user } = useSelector((state) => state.user);

  const isWithin24Hours = (createdAt) => {
    const now = new Date();
    const storyCreatedAt = new Date(createdAt);
    const diffInMilliseconds = now - storyCreatedAt;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  const suggestUser = async () => {
    try {
      const res = await axios.get("user/suggestedUser");
      setSuggestedUser(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  useEffect(() => {
    if (user?.followers?.length <= 0) {
      suggestUser();
    }
  }, [user]);

  return (
    <motion.div
      className="md:w-full w-screen h-full bg-dark-1 text-white p-10 mb-20 md:mb-10"
      key="home"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="font-bold text-3xl">Home</h2>
        <div className="w-full flex items-center justify-center my-6 border-b-2 border-gray-1 ">
          <div className="w-[650px] my-5 flex items-center  gap-4 overflow-x-scroll">
            {user &&
            user.story?.mediaUrl?.url &&
            isWithin24Hours(user.story.createdAt) ? (
              <Story
                id={user?._id}
                storyImage={user.story?.mediaUrl?.url}
                image={user.avatar?.url}
                userName={user.name}
                userAvatar={user.avatar?.url}
              />
            ) : (
              <Story id={user?._id} />
            )}

            {user &&
              user.followers?.map((fol) => {
                return (
                  isWithin24Hours(fol.story?.createdAt) && (
                    <Story
                      key={fol._id}
                      image={fol.story?.mediaUrl?.url}
                      name={fol.name}
                      storyImage={fol.story?.mediaUrl?.url}
                      userName={fol.name}
                      userAvatar={fol.avatar.url}
                      id={fol._id}
                    />
                  )
                );
              })}
          </div>
        </div>

        <div className=" w-full flex flex-col justify-center items-center ">
          {user &&
            user.followers?.map((fol) => {
              return fol.posts?.map((post) => {
                return (
                  <ProjectCard
                    key={post._id}
                    id={post._id}
                    owner={fol.name}
                    avatar={fol.avatar?.url}
                    description={post.description}
                    image={post.image?.url}
                    likes={post.likes}
                    comments={post.comments}
                    createdAt={post.createdAt}
                    ownerId={post.owner}
                  />
                );
              });
            })}
        </div>

        {user && user.followers?.length <= 0 && (
          <div>
            <h2 className="text-white text-2xl font-medium py-5">
              Suggestions for you
            </h2>

            <div className="flex items-center flex-col  w-full gap-8">
              {suggestUser &&
                suggestedUser.map((item) => {
                  return (
                    <ShowUser
                      name={item.name}
                      username={item?.username ? item.username : item.name}
                      avatar={item.avatar?.url}
                      id={item._id}
                      isFollowedByCurrentUser={user?.followers?.some(
                        (follower) => follower._id === item._id
                      )}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Home;
