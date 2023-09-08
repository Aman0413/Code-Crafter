const { accessChat, getChat } = require("../controllers/Chat");
const { isAuthenticate } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/", isAuthenticate, accessChat);
router.get("/", isAuthenticate, getChat);

module.exports = router;
