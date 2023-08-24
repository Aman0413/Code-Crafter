const jwt = require("jsonwebtoken");

exports.isAuthenticate = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Authenticating User",
      error: error.message,
    });
  }
};
