import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosclient";
import { CiUndo } from "react-icons/ci";

function CreatePost() {
  const [postData, setPostData] = useState({
    description: "",
    image: "",
  });

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const res = axios.post("user/post/createPost", {
        description: postData.description,
        image: postData.image,
      });

      toast.promise(res, {
        loading: "Posting...",
        success: (data) => {
          return data.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      });

      e.target.reset();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      e.target.reset();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostData({ ...postData, image: fileReader.result });
        console.log("img data", fileReader.result);
      }
    };
  };

  useEffect(() => {}, [postData]);

  return (
    <div className="bg-dark-1 w-full h-full p-10 text-white mb-20 md:mb-10">
      <div className="text-white flex items-center justify-between">
        <h2 className="text-3xl font-bold text-left">Post</h2>

        {/* reset button TODO */}
        {/* <button
          className="transition-all ease-in-out  duration-200 active:scale-95"
          type="reset"
          onClick={() => {
            setPostData({
              projectName: "",
              description: "",
              codeUrl: "",
              liveUrl: "",
              image: "",
            });
          }}
        >
          <CiUndo className="text-2xl font-extrabold " />
        </button> */}
      </div>

      <div className="mt-10">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xl font-medium">
              Share Your Thoughts
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-3 rounded-lg bg-dark-2 outline-none focus:outline-gray-1 text-xl"
              onChange={(e) => {
                setPostData({ ...postData, description: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            {postData.image && (
              <img
                src={postData.image}
                alt="project-image"
                className="w-full h-80 rounded-md"
              />
            )}

            <label htmlFor="image" className="text-xl font-medium">
              Image <span className="text-red-600">*</span>
            </label>

            <input
              type="file"
              accept="image/* "
              onChange={handleImageChange}
              class="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-dark-1 file:text-primary-500 p-2 rounded-lg bg-dark-2  outline-none focus:outline-gray-1"
            />
          </div>

          <button className="mt-7 bg-primary-500 rounded-lg p-3 font-bold text-xl transition-all ease-in-out duration-200 active:scale-95">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
