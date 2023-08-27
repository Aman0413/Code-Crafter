const {
  signup,
  login,
  logout,
  changePassword,
  sendOtp,
  sendForgetPasswordLink,
  resetPassword,
} = require("../controllers/Auth");
const { isAuthenticate } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/sendOtp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isAuthenticate, logout);
router.post("/changePassword", isAuthenticate, changePassword);
router.post("/sendForgetPasswordLink", sendForgetPasswordLink);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
