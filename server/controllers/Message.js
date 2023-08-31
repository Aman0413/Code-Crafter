const Chat = require("../models/Chat");
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    let msg = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
    });

    msg = await msg.populate("sender");
    msg = await msg.populate("chat");
    msg = await User.populate(msg, {
      path: "chat.users",
      select: "name avatar email",
    });

    await Chat.findById(chatId, {
      latestMessage: msg,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: msg,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while sending message",
      error: error.message,
    });
  }
};
