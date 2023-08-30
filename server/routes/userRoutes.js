const router = require("express").Router();

const {
  getUserProfile,
  followAndUnfollowUser,
  likeAndUnlikeProject,
  updateUserProfile,
  searchUser,
  getUserProfileById,
  getUserSimilarMinds,
  getSuggestedUsers,
  createStory,
  deleteStory,
  deleteUser,
} = require("../controllers/User");
const { isAuthenticate } = require("../middleware/authMiddleware");

router.get("/myProfile", isAuthenticate, getUserProfile);
router.post("/userProfile", isAuthenticate, followAndUnfollowUser);
router.post("/post", isAuthenticate, likeAndUnlikeProject);
router.put("/profile", isAuthenticate, updateUserProfile);
router.get("/search", isAuthenticate, searchUser);
router.get("/profile/:id", isAuthenticate, getUserProfileById);
router.get("/profile/similarMinds", isAuthenticate, getUserSimilarMinds);
router.get("/suggestedUser", isAuthenticate, getSuggestedUsers);
router.post("/story/add", isAuthenticate, createStory);
router.delete("/story/delete", isAuthenticate, deleteStory);
router.delete("/deleteMyAccount", isAuthenticate, deleteUser);

module.exports = router;
