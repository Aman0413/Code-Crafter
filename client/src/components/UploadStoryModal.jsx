import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosclient";
import Loader from "./utils/Loader";
import { getMyProfile } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

function UploadStoryModal({ show, hide }) {
  const [storyData, setStoryData] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (!show) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setStoryData(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  };

  const uploadStory = async () => {
    try {
      setLoading(true);
      const res = await axios.post("user/story/add", {
        image: storyData,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(getMyProfile());
        hide(false);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <div class="min-w-screen  h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-dark-2 ">
          <div class="text-white ">
            <div className="flex w-full flex-col justify-center items-center gap-4">
              <h2 className="font-bold text-xl">Share Your Story</h2>
            </div>

            <div className=" ">
              {storyData && (
                <img src={storyData} alt="" className=" w-full h-72" />
              )}
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

            <div class="p-3  mt-2 text-center space-x-4 md:block">
              <button
                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                onClick={() => hide(false)}
              >
                Cancel
              </button>
              <button
                class="mb-2 md:mb-0 bg-primary-500 border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg transition-all ease-in-out duration-200 active:scale-95"
                onClick={uploadStory}
              >
                {loading ? <Loader /> : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadStoryModal;
