const mongoose = require("mongoose");
const sendMail = require("../utils/sendMail");
const OtpVerification = require("../mail/templates/OtpVerification");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 5,
  },
});

// a function to send email
async function sendVerificationMail(email, otp) {
  try {
    const mailResponse = await sendMail(
      email,
      "Verify your email",
      OtpVerification(otp)
    );
  } catch (error) {
    console.log("Error while sending otp", error);
    throw error;
  }
}

// a pre hook to send email
otpSchema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp);
  next();
});
module.exports = mongoose.model("OTP", otpSchema);
