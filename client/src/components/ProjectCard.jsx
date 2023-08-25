import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail, BiMessageSquareDetail } from "react-icons/bi";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Loader from "./utils/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteProjectModal from "./DeleteProjectModal";
import { getMyProfile } from "../redux/slices/userSlice";

const ProjectCard = ({
  id,
  avatar,
  owner,
  description,
  image,
  likes,
  comments,
}) => {
  const { user } = useSelector((state) => state.user);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const checkUserLikedOrNot = (id) => {
    console.log("LIKEd", id);
    if (likes.includes(id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.post("/user/post", {
        postId: id,
      });

      console.log("object", res.data);
      dispatch(getMyProfile());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await axios.delete("user/post/postId", {
        postId: id,
      });

      console.log("object", res.data);
      dispatch(getMyProfile());
      toast.promise(res, {
        loading: "Deleting...",
        success: (data) => {
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

  const postComment = async (id, comment) => {
    try {
      setLoading(true);
      const res = await axios.post("user/post/comment", {
        postId: id,
        comment,
      });

      setLoading(false);
      dispatch(getMyProfile());
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
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserLikedOrNot(id);
  }, [id, dispatch]);

  return (
    <div className="bg-dark-2 rounded-lg shadow p-4 m-4 text-white md:w-96 w-full ">
      <div className="flex items-center justify-between">
        <div className="flex  items-center gap-2">
          <img
            src={avatar}
            alt="post"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="font-bold">{owner}</span>
        </div>

        {user?._id === id ? (
          <button className="text-xl" onClick={() => setDeleteModal(true)}>
            <RiDeleteBin6Line />
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="py-5">
        <p className="font-bold">{description}</p>
      </div>
      <p className="mt-2">
        <img src={image} alt="" className="rounded-md" />
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

          <p className="text-sm md:text-base">{likes?.length} likes</p>
        </button>
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={toggleComments}
        >
          <BiMessageSquareDetail className="text-xl md:text-3xl " />

          <p className="hidden md:block">
            Comments {comments?.length <= 0 ? 0 : comments?.length}
          </p>
        </div>
      </div>
      {showComments && (
        <div className="bg-dark-1 p-3 rounded-md mt-4 h-48 flex flex-col  transition-all ease-in-out duration-200 justify-between">
          {/* Comment section */}

          <div className="overflow-y-scroll flex flex-col items-start gap-6 ">
            {comments && comments.length === 0 && (
              <p className="text-gray-1">No Comments Yet</p>
            )}
            {comments &&
              comments.length > 0 &&
              comments.map((item) => {
                return (
                  <div
                    className=" flex items-center justify-between w-[95%] mt-5"
                    key={item._id}
                  >
                    <div className="flex items-start gap-2">
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
                        className="text-xl"
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
