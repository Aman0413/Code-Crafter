import React from "react";
import PostCardShimmerEffect from "./PostCardShimmerEffect";

function ProfileShimmer() {
  return (
    <div class="w-full  ">
      <div class="relative px-4 w-full bg-dark-1 rounded-lg overflow-hidden shadow hover:shadow-md ">
        <div class="flex items-center mt-5 mb-3 animate-pulse ">
          <div>
            <div class="rounded-full bg-gray-600 md:w-32 md:h-32 w-20 h-20 "></div>
          </div>
          <div class="flex justify-between w-full ml-3">
            <div class="w-5/12 h-6 md:h-8 bg-gray-600 rounded "></div>
            <div class="w-[20%] h-3 md:h-5 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center gap-8 mt-10 ">
        <PostCardShimmerEffect />
        <PostCardShimmerEffect />
        <PostCardShimmerEffect />
      </div>
    </div>
  );
}

export default ProfileShimmer;
