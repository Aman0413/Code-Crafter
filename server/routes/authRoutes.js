const {
  signup,
  login,
  logout,
  changePassword,
  forgetPassword,
  sendOtp,
} = require("../controllers/Auth");
const { isAuthenticate } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/sendOtp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isAuthenticate, logout);
router.post("/changePassword", isAuthenticate, changePassword);
router.post("/forgetPassword", forgetPassword);

module.exports = router;
