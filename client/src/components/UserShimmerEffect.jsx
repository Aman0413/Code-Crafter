import React from "react";

function UserShimmerEffect() {
  return (
    <div class="w-full ">
      <div class="relative px-4 w-full bg-dark-2 rounded-lg overflow-hidden shadow hover:shadow-md ">
        <div class="flex items-center mt-5 mb-3 animate-pulse">
          <div>
            <div class="rounded-full bg-gray-600 w-10 h-10 "></div>
          </div>
          <div class="flex justify-between w-full ml-3">
            <div class="w-5/12 h-3 bg-gray-600 rounded "></div>
            <div class="w-[20%] h-3 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserShimmerEffect;
