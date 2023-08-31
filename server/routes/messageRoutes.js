const { sendMessage } = require("../controllers/Message");
const { isAuthenticate } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/chat", isAuthenticate, sendMessage);

module.exports = router;
