const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select(
      "-password"
    );

    if (!users) {
      return res.status(400).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all users",
      error: error.message,
    });
  }
};
