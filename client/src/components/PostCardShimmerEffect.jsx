import React from "react";

function PostCardShimmerEffect() {
  return (
    <div class="md:w-[500px] w-[calc(100vw-20vw)] ">
      <div class="relative p-4 w-full bg-dark-2 rounded-lg overflow-hidden shadow hover:shadow-md ">
        <div class="flex items-center mt-5 mb-3">
          <div>
            <div class="rounded-full bg-gray-600 w-10 h-10"></div>
          </div>
          <div class="flex justify-between w-full ml-3">
            <div class="w-5/12 h-3 bg-gray-600 rounded"></div>
            <div class="w-[10%] h-3 bg-gray-600 rounded"></div>
          </div>
        </div>
        <div class="animate-pulse flex flex-col">
          <div class="rounded w-full h-52 bg-gray-600"></div>
          <div class="flex flex-col mt-5">
            <div class="w-full h-5 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCardShimmerEffect;
