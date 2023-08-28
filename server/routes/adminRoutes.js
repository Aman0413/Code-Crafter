const { getAllUsers } = require("../controllers/Admin");
const { isAdmin, isAuthenticate } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/allUsers", isAuthenticate, isAdmin, getAllUsers);

module.exports = router;
