const router = require("express").Router();
const {
  createPost,
  deletePost,
  commentOnPost,
  deleteComment,
} = require("../controllers/Post");

const { isAuthenticate } = require("../middleware/authMiddleware");

router.post("/createPost", isAuthenticate, createPost);
router.delete("/deletePost/:postId", isAuthenticate, deletePost);
router.post("/comment", isAuthenticate, commentOnPost);
router.delete("/comment/:commentId", isAuthenticate, deleteComment);

module.exports = router;
