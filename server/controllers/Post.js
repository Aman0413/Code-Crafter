const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const { uploadImageToCloudinary } = require("../utils/uploadImage");
const Comment = require("../models/Comment");

//post or share post
exports.createPost = async (req, res) => {
  try {
    const { description, image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //upload image to cloudinary
    const result = await uploadImageToCloudinary(image);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Error in uploading image",
      });
    }

    //find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //create Post
    const post = await Post.create({
      owner: user._id,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    if (!post) {
      return res.status(500).json({
        success: false,
        message: "Error in creating Post",
      });
    }

    //push Post to user
    user.posts.push(post._id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Post Posted Successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Posting Post",
      error: error.message,
    });
  }
};

//delete Post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Please provide Post id",
      });
    }

    //find Post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    //find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //check if user is owner of Post
    if (post.owner.toString() !== user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to delete this Post",
      });
    }

    //delete Post from cloudinary
    post.image.map(async (item) => {
      await cloudinary.uploader.destroy(item.public_id);
    });

    //delete Post
    await post.deleteOne();

    //delete Post from user
    user.posts.pull(postId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting Post",
      error: error.message,
    });
  }
};

//comments on Post
exports.commentOnPost = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    if (!postId || !comment) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //find Post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    //find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //add comment to Post
    const newComment = await Comment.create({
      user: user._id,
      post: post._id,
      content: comment,
    });

    if (!newComment) {
      return res.status(500).json({
        success: false,
        message: "Error in commenting",
      });
    }

    //push comment to Post
    post.comments.push(newComment._id);
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Commented successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in commenting",
      error: error.message,
    });
  }
};

//delete comment on Post
exports.deleteComment = async (req, res) => {
  try {
    //get from param
    const { commentId } = req.params;
    const userId = req.user.id;

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Please provide comment id",
      });
    }

    //find comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment not found",
      });
    }

    //find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //check if user is owner of comment
    if (comment.user.toString() !== user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    //remove comment from Post
    const post = await Post.findById(comment.post);
    post.comments.pull(commentId);
    await post.save();
    await comment.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting comment",
      error: error.message,
    });
  }
};
