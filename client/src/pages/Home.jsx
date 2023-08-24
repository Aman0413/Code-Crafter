import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/slices/userSlice";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/utils/Loader";
import Story from "../components/Story";

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const isWithin24Hours = (createdAt) => {
    const now = new Date();
    const storyCreatedAt = new Date(createdAt);
    const diffInMilliseconds = now - storyCreatedAt;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  return (
    <div className="md:w-full w-screen h-full bg-dark-1  text-white p-10">
      <div>
        <h2 className="font-bold text-3xl">Home</h2>

        <div className="w-full flex items-center justify-center my-6 border-b-2 border-gray-1 ">
          <div className="w-[650px] my-5 flex items-center  gap-4 overflow-x-scroll">
            {user && <Story id={user._id} />}
            {user &&
              user.story.length > 0 &&
              user.story.map((story) => {
                return (
                  isWithin24Hours(story.createdAt) && (
                    <Story
                      key={story._id}
                      image={story.mediaUrl?.url}
                      name={user.name}
                      storyImage={story.mediaUrl?.url}
                      userName={user.name}
                      userAvatar={user.avatar?.url}
                      id={user._id}
                    />
                  )
                );
              })}

            {user &&
              user.followers.map((fol) => {
                return fol.story?.map((story) => {
                  return (
                    isWithin24Hours(story.createdAt) && (
                      <Story
                        key={story._id}
                        image={story.mediaUrl?.url}
                        name={fol.name}
                        storyImage={story.mediaUrl?.url}
                        userName={fol.name}
                        userAvatar={fol.avatar.url}
                        id={fol._id}
                      />
                    )
                  );
                });
              })}
          </div>
        </div>

        <div className="mt-6   flex flex-col gap-8 items-center">
          {!user && <Loader />}
          {user &&
            user.followers.map((fol) => {
              return fol.posts?.map((post) => {
                return (
                  <ProjectCard
                    key={post._id}
                    id={post._id}
                    owner={fol.name}
                    avatar={fol.avatar?.url}
                    description={post.description}
                    image={post.image[0]?.url}
                    likes={post.likes}
                    comments={post.comments}
                  />
                );
              });
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
