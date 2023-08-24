import React from "react";

function MyAvatar({ image }) {
  return (
    <div class="text-center rounded-full">
      <img
        src={image}
        class="mx-auto mb-4 w-32 h-20 rounded-full"
        alt="Avatar"
      />
    </div>
  );
}

export default MyAvatar;
