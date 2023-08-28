const jwt = require("jsonwebtoken");

exports.isAuthenticate = async (req, res, next) => {
  try {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is required",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

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

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "User not authorized to access this admin route",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Authenticating User",
      error: error.message,
    });
  }
};
