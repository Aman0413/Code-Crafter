import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Loader from "./utils/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteProjectModal from "./DeleteProjectModal";
import { getMyProfile } from "../redux/slices/userSlice";
import getTimeAgo from "../utils/getTimeAgo";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectCard = ({
  id,
  avatar,
  owner,
  description,
  image,
  likes,
  comments,
  ownerId,
  createdAt,
  controls,
}) => {
  const { user } = useSelector((state) => state.user);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [likeLength, setLikeLength] = useState();
  const [allComments, setAllComments] = useState();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const checkLikeandComment = async () => {
    try {
      setProgress(30);
      const res = await axios.post("user/post/checkLike", {
        postId: id,
      });
      setProgress(50);
      setProgress(100);

      setIsLiked(res.data.isLiked);
      setLikeLength(res.data.likeLength);
      setAllComments(res.data.comments);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.post("/user/post", {
        postId: id,
      });

      checkLikeandComment();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const postComment = async (id, comment) => {
    try {
      setLoading(true);
      const res = await axios.post("user/post/comment", {
        postId: id,
        comment,
      });

      setLoading(false);
      checkLikeandComment();
      toast.success(res.data?.message);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
      setLoading(false);
      setComment("");
    }
  };

  const deleteComment = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`user/post/comment/${id}`);

      toast.success(res.data.message);
      setLoading(false);
      checkLikeandComment();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLikeandComment();
  }, []);
  return (
    <div className="bg-dark-2 rounded-lg shadow p-4 m-4 text-white md:w-[500px] w-[calc(100vw-20vw)]">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex items-center justify-between">
        <div
          className="flex  items-center gap-2 cursor-pointer"
          onClick={() => navigate(`/profile/${ownerId}`)}
        >
          <img
            src={avatar}
            alt="post"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="font-bold">{owner}</span>
        </div>

        {user?._id === ownerId ? (
          <button
            className="text-xl text-gray-1 cursor-pointer"
            onClick={() => setDeleteModal(true)}
          >
            <RiDeleteBin6Line />
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="py-3 md:py-5">
        <p className="font-bold">{description}</p>
      </div>
      <p className="mt-2 w-full">
        <img src={image} alt="" className="rounded-md w-full" />
      </p>
      <div className="flex items-center mt-4 gap-6">
        <button
          className="flex items-center gap-4 transition-all ease-in-out duration-200 "
          onClick={() => {
            handleLike(id);
          }}
        >
          {isLiked ? (
            <AiFillHeart className="text-2xl md:text-3xl active:scale-95 text-red-600" />
          ) : (
            <AiOutlineHeart className=" text-2xl md:text-3xl active:scale-95" />
          )}

          <p className="text-sm md:text-base">{likeLength} likes</p>
        </button>
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={toggleComments}
        >
          <BiMessageSquareDetail className="text-xl md:text-3xl " />
        </div>
      </div>

      <div className="flex items-start mt-2 pl-1 text-gray-1 text-sm ">
        {getTimeAgo(createdAt)}
      </div>

      {showComments && (
        <div className="bg-dark-1 p-3 rounded-md mt-4 h-48 flex flex-col  transition-all ease-in-out duration-200 justify-between">
          {/* Comment section */}

          <div className="overflow-y-scroll flex flex-col items-start gap-6 ">
            {allComments && comments.length === 0 && (
              <p className="text-gray-1">No Comments Yet</p>
            )}
            {allComments.length > 0 &&
              allComments.map((item) => {
                return (
                  <div
                    className=" flex items-center justify-between w-[95%] mt-5"
                    key={item._id}
                  >
                    <div
                      className="flex items-start gap-2 cursor-pointer"
                      onClick={() => navigate(`/profile/${item.user._id}`)}
                    >
                      <div>
                        <Avatar round size="30" src={item.user.avatar?.url} />
                      </div>
                      <div className="flex flex-col items-start ">
                        <p className="text-gray-1 font-bold">
                          {item.user.name}
                        </p>
                        <p>{item.content} </p>
                      </div>
                    </div>

                    {user?._id === item.user._id && (
                      <div
                        className="text-xl text-gray-1 cursor-pointer"
                        onClick={() => deleteComment(item._id)}
                      >
                        <RiDeleteBin5Fill />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="w-full  flex justify-between items-center ">
            <input
              type="text"
              className="w-[70%] p-2  bg-dark-1 text-white border-b-2 outline-none border-primary-500"
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-primary-500 md:w-[20%] p-2 rounded-lg font-medium  flex items-center justify-center"
              onClick={() => {
                postComment(id, comment);
              }}
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>
        </div>
      )}

      {deleteModal && (
        <DeleteProjectModal show={deleteModal} hide={setDeleteModal} id={id} />
      )}
    </div>
  );
};

export default ProjectCard;
