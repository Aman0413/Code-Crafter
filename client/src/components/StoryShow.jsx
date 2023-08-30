import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { RiDeleteBinLine } from "react-icons/ri";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosclient";
import { useSelector } from "react-redux";

function StoryShow({ show, hide, storyImage, userName, userAvatar, id }) {
  const [progress, setProgress] = useState(0);
  const { user } = useSelector((state) => state.user);

  const duration = 20; // seconds

  const deleteStory = async () => {
    try {
      const res = await axios.delete(`user/story/delete`);
      if (res.data.success) {
        toast.success(res.data.message);
        hide(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 100 / duration;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, duration * 20); // Adjust the interval based on your preference

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (progress === 100) {
      hide(false);
    }
  }, [progress]);

  if (!show) return null;
  return (
    <div>
      <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover rounded-lg">
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-dark-3 shadow-md  border border-gray-1 rounded-lg">
            <ProgressBar
              completed={progress}
              bgColor={"#877EFF"}
              height="1px"
              isLabelVisible={false}
            />
            <div
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out "
              onClick={() => hide(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Close"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-3 pb-5">
                <Avatar src={userAvatar} round size="40" />
                <p>{userName}</p>
              </div>

              {user?._id === id && (
                <div className="text-xl text-gray-1" onClick={deleteStory}>
                  <RiDeleteBinLine />
                </div>
              )}
            </div>
            <div className="w-[80%] h-[80%] rounded-lg ">
              <img
                src={storyImage}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryShow;
