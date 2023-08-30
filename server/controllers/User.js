const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { uploadImageToCloudinary } = require("../utils/uploadImage");
const cloudinary = require("cloudinary");

//get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("posts")
      .populate({
        path: "followers",
        populate: [
          {
            path: "posts",
            model: Post, // Replace 'Post' with the actual model name for posts
            options: { sort: { createdAt: -1 } },
            populate: {
              path: "comments",
              model: Comment, // Replace 'Comment' with the actual model name for comments
              populate: {
                path: "user",
                model: User, // Replace 'User' with the actual model name for users
              },
            },
          },
        ],
      })
      .populate("story") // Populate the user's stories
      .exec();

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting user profile",
      error: error.message,
    });
  }
};

//update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { image, name, username, about } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //save to cloudinarys

    if (image) {
      const result = await uploadImageToCloudinary(image);
      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Error in uploading image",
        });
      }

      user.avatar.public_id = result.public_id;
      user.avatar.url = result.url;
    }

    user.name = name;
    user.username = username;
    user.about = about;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating user profile",
      error: error.message,
    });
  }
};

//follow and unfollow user
exports.followAndUnfollowUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide user id",
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

    //find user to follow
    const userToFOllow = await User.findById(userId);
    if (!userToFOllow) {
      return res.status(400).json({
        success: false,
        message: "User to follow not found",
      });
    }

    //check user trying to follow himself
    if (user._id.toString() === userToFOllow._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    //check if user is already following you
    const isFollowing = user.followers.includes(userToFOllow._id);
    if (isFollowing) {
      //unfollow user
      user.followers.pull(userToFOllow._id);
      userToFOllow.followings.pull(user._id);
      await user.save();
      await userToFOllow.save();

      return res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
      });
    } else {
      //follow user
      user.followers.push(userToFOllow._id);
      userToFOllow.followings.push(user._id);
      await user.save();
      await userToFOllow.save();

      return res.status(200).json({
        success: true,
        message: "User followed successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in following/unfollowing user",
      error: error.message,
    });
  }
};

//like and unlike project
exports.likeAndUnlikeProject = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Please provide project id",
      });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Project not found",
      });
    }

    //check if user has already liked the project
    const isLiked = post.likes.includes(req.user.id);
    if (isLiked) {
      //unlike project
      post.likes.pull(req.user.id);
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Project unliked successfully",
      });
    } else {
      //like project
      post.likes.push(req.user.id);
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Project liked successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in liking/unliking project",
      error: error.message,
    });
  }
};

//search user
exports.searchUser = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const users = await User.find({
      $or: [{ name: { $regex: searchQuery, $options: "i" } }],
    });

    return res.status(200).json({
      success: true,
      message: "User searched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in searching user",
      error: error.message,
    });
  }
};

//get user profile by id
exports.getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate({
        path: "posts",
        populate: {
          path: "comments",
          populate: {
            path: "user", // Assuming "user" is the field that references users in your Comment schema
          },
          options: { sort: { createdAt: -1 } },
        },
      })
      .populate({
        path: "followers",
      })
      .populate({
        path: "followings",
      })
      .exec();

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting user profile",
      error: error.message,
    });
  }
};

//get user similar minds
exports.getUserSimilarMinds = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    let similarMinds = await User.find({
      _id: { $ne: req.user.id },
      about: user.about,
      posts: user.posts,
    });

    if (!similarMinds) {
      similarMinds = await User.find({
        sort: { createdAt: -1 },
      }).limit(5);
    }

    return res.status(200).json({
      success: true,
      message: "Similar minds fetched successfully",
      data: similarMinds,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting similar minds",
      error: error.message,
    });
  }
};

//get suggested users
exports.getSuggestedUsers = async (req, res) => {
  try {
    // const suggestedUsers = await User.find({
    //   sort: { createdAt: -1 },
    // }).limit(10);

    const suggestedUsers = await User.find({ _id: { $ne: req.user.id } });

    if (!suggestedUsers) {
      return res.status(400).json({
        success: false,
        message: "No suggested users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Suggested users fetched successfully",
      data: suggestedUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting suggested users",
      error: error.message,
    });
  }
};

//create story
exports.createStory = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Please provide image",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //upload image to cloudinary
    const result = await uploadImageToCloudinary(image);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Error in uploading image",
      });
    }

    //create story
    user.story.mediaUrl.public_id = result.public_id;
    user.story.mediaUrl.url = result.url;

    //set story creation time
    const currentTime = new Date();
    user.story.createdAt = currentTime;
    //set story expiry time
    const expiresAt = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
    user.story.expiresAt = expiresAt;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Story created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating story",
      error: error.message,
    });
  }
};

//delete story
exports.deleteStory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //delete story from cloudinary
    await cloudinary.v2.uploader.destroy(user.story.mediaUrl.public_id);

    //delete story from db
    user.story.mediaUrl.public_id = "";
    user.story.mediaUrl.url = "";
    user.story.createdAt = "";
    user.story.expiresAt = "";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting story",
      error: error.message,
    });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //delete user's all posts
    await Post.deleteMany({ owner: req.user.id });

    //delete user comments from db
    await Comment.deleteMany({ user: req.user.id });

    //remove user from followers list
    user.followers.forEach(async (follower) => {
      const userFollower = await User.findById(follower);
      userFollower.followings.pull(req.user.id);
      await userFollower.save();
    });

    //remove user from followings list
    user.followings.forEach(async (following) => {
      const userFollowing = await User.findById(following);
      userFollowing.followers.pull(req.user.id);
      await userFollowing.save();
    });

    //delete user from db
    await User.findByIdAndDelete(req.user.id);

    //logout user
    res.clearCookie("token", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting user",
      error: error.message,
    });
  }
};
