import React, { useEffect, useState } from "react";
import StoryShow from "./StoryShow";
import { useSelector } from "react-redux";
import UploadStoryModal from "./UploadStoryModal";

function Story({ image, name, storyImage, userName, userAvatar, id }) {
  const { user } = useSelector((state) => state.user);
  const [uploadStoryModal, setUploadStoryModal] = useState(false);

  const [showStory, setShowStory] = useState(false);

  return (
    <>
      <li class="flex flex-col items-center space-y-1 relative">
        <div class="bg-gradient-to-tr from-dark-3 to-primary-500 p-1 rounded-full">
          <a
            class=" bg-white block rounded-full p-1 hover:-rotate-6 transform transition"
            href="#"
          >
            <img
              class="h-16 w-16 md:h-20 md:w-20 rounded-full"
              src={storyImage}
              alt="cute kitty"
              onClick={() => setShowStory(true)}
            />
          </a>
        </div>
        {user?._id === id ? (
          <div className={`${storyImage ? "hidden" : "block"}`}>
            <button
              class="absolute bottom-8 right-1 bg-primary-500 rounded-full h-8 w-8 text-2xl
        text-white font-semibold border-2
         border-white flex justify-center items-center font-mono hover:bg-blue-700"
              onClick={() => setUploadStoryModal(true)}
            >
              +
            </button>
          </div>
        ) : (
          ""
        )}
        <a href="#">{user?._id === id ? "You" : name}</a>
      </li>
      {showStory && (
        <StoryShow
          show={showStory}
          hide={setShowStory}
          storyImage={storyImage}
          userName={userName}
          userAvatar={userAvatar}
        />
      )}

      {uploadStoryModal && (
        <UploadStoryModal show={uploadStoryModal} hide={setUploadStoryModal} />
      )}
    </>
  );
}

export default Story;
