import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosclient";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
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
          navigate("/");
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
      }
    };
  };

  const generateAICaption = async (e) => {
    e.preventDefault();

    try {
      const res = axios.post("user/post/generate-caption", {
        image: postData.image,
      });
      toast.promise(res, {
        loading: "Generating Caption...",
        success: (data) => {
          setPostData({ ...postData, description: data.data.caption });
          return data.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // useEffect(() => {}, [postData]);

  return (
    <motion.div
      className="bg-dark-1 w-screen md:w-full h-full p-10 text-white mb-20 md:mb-10"
      key="create-post"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-white flex items-center justify-between">
        <h2 className="text-3xl font-bold text-left">Post</h2>
      </div>

      <div className="mt-10">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xl font-medium">
              Share Your Thoughts
            </label>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <textarea
                type="text"
                name="name"
                id="name"
                className="p-2  rounded-lg w-full bg-dark-2 outline-none focus:outline-gray-1 text-sm md:text-xl"
                value={postData.description}
                onChange={(e) => {
                  setPostData({ ...postData, description: e.target.value });
                }}
              />
              <button
                className=" text-sm p-1 bg-primary-500 rounded-lg font-bold transition-all ease-in-out duration-200 active:scale-95"
                onClick={generateAICaption}
              >
                AI Caption
              </button>
            </div>
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

          <button
            className="mt-7 bg-primary-500 rounded-lg p-3 font-bold text-xl transition-all ease-in-out duration-200 active:scale-95"
            onClick={handleSubmit}
          >
            Post
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default CreatePost;
