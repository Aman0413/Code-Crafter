const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendMail = require("../utils/sendMail");
const resetPasswordTemplate = require("../mail/templates/ResetPassword");

//send otp before for verification
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCase: false,
      upperCaseAlphabets: false,
      alphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    //check unique otp
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCase: false,
        upperCaseAlphabets: false,
        alphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
    }

    //create new otp
    const newOtp = await OTP.create({
      email,
      otp,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: newOtp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in sending OTP",
      error: error.message,
    });
  }
};

//register user post request
exports.signup = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    console.log("BODY", req.body);

    if (!name || !email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //check if otp exists
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 });

    console.log("RECENT OTP", recentOtp);

    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP does not exist",
      });
    } else if (recentOtp[0].otp != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //update user profile
    const userProfile = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

    //create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: {
        public_id: "user",
        url: userProfile,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User Signed Up Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Signing Up",
      error: error.message,
    });
  }
};

//login user post request
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("BODY", req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //create token
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Logging In",
      error: error.message,
    });
  }
};

//logout user get request
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      // secure: true,
    });
    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Logging Out",
      error: error.message,
    });
  }
};

//change password post request
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //check if old and new password are same
    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and New Password cannot be same",
      });
    }

    const user = await User.findById(id).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    //check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Changing Password",
      error: error.message,
    });
  }
};

//forget password post request
exports.sendForgetPasswordLink = async (req, res) => {
  try {
    //generate reset password token
    const resetToken = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    //send email
    const resetPasswordLink = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

    //save reset password token in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    user.forgetPasswordToken = resetToken;
    user.forgetPasswordExpire = Date.now() + 30 * 60 * 1000;

    await user.save();

    const message = "<p>Please click the link to reset your password</p>";
    const mailResponse = await sendMail(
      req.body.email,
      "Reset Password Link",
      resetPasswordTemplate(resetPasswordLink)
    );

    return res.status(200).json({
      success: true,
      message: "Reset Password Link sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Sending Email",
      error: error.message,
    });
  }
};

//reset password post request
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //check if token exists
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    //verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    //check if token is expired
    const user = await User.findOne({ email: decoded.email });

    //check both token
    if (user.forgetPasswordToken !== token) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (user.forgetPasswordExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token Expired",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //update password
    user.password = hashedPassword;
    user.forgetPasswordToken = null;
    user.forgetPasswordExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Resetting Password",
      error: error.message,
    });
  }
};
