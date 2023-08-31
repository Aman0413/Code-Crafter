import React from "react";

function MyAvatar({ image }) {
  return (
    <img
      class="w-full h-full p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
      src={image}
      alt="profile"
    />
  );
}

export default MyAvatar;
