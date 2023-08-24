import React from "react";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";

function DeleteProjectModal({ show, hide, id }) {
  const deletePost = async (postId) => {
    try {
      const res = await axios.delete(`user/post/deletePost${postId}`);
      console.log("object", res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        hide(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  if (!show) return null;

  return (
    <div>
      <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-dark-2 ">
          <div class="text-white ">
            <div className="flex w-full flex-col justify-center items-center gap-4">
              <h2 className="font-bold text-xl">Are you sure ?</h2>
              <p className="text-center text-gray-1">
                Do you really want to delete your post? This process cannot be
                undone
              </p>
            </div>
            <div class="p-3  mt-2 text-center space-x-4 md:block">
              <button
                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                onClick={() => hide(false)}
              >
                Cancel
              </button>
              <button
                class="mb-2 md:mb-0 bg-primary-500 border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg transition-all ease-in-out duration-200 active:scale-95"
                onClick={() => deletePost(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
