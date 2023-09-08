const Chat = require("../models/Chat");
const User = require("../models/User");

exports.accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id not found",
      });
    }

    let chat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "name avatar username")
      .populate("latestMessage");

    chat = await User.populate(chat, {
      path: "latestMessage",
      select: "name avatar username",
    });

    if (chat.length > 0) {
      return res.status(200).json({
        success: true,
        chat: chat[0],
      });
    } else {
      const newChat = await Chat.create({
        users: [req.user.id, userId],
        chatName: "sender",
      });

      const FullChat = await Chat.findOne({
        _id: newChat._id,
      }).populate("users", "name avatar username");

      return res.status(200).json({
        success: true,
        chat: FullChat,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in accessing chat",
      error: error.message,
    });
  }
};

exports.getChat = async (req, res) => {
  try {
  } catch (error) {}
};
