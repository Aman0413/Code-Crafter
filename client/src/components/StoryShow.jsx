import React from "react";
import Avatar from "react-avatar";
import { RiDeleteBinLine } from "react-icons/ri";

function StoryShow({ show, hide, storyImage, userName, userAvatar, id }) {
  if (!show) return null;

  return (
    <div>
      <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover rounded-lg">
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div
            className="relative py-8 px-5 md:px-10 bg-dark-3 shadow-md rounded border border-gray-400"
            onClick={() => hide(false)}
          >
            <div
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
              onclick="modalHandler()"
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
            <div>
              <div className="flex items-center gap-3 pb-5">
                <Avatar src={userAvatar} round size="40" />
                <p>{userName}</p>
              </div>
              <RiDeleteBinLine />
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
