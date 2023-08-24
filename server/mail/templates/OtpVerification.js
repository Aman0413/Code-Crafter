const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html>
  <head>
  <base target="_top">
  </head>
  <body>
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:80%;padding:20px 0">
  <div style="border-bottom:5px solid #eee">
    <a href="" style="font-size:30px;color: #f7c800;text-decoration:none;font-weight:600">CodeCrafter</a>
  </div>
  <p style="font-size:15px">Hello Folk</p>
  <p>Thank you for registering with CodeCrafter. To complete your registration, please use the following OTP
  (One-Time Password) to verify your account</p>
  <p>Remember, Never share this OTP with anyone.</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
  <p style="font-size:15px;">Regards,<br />Team CodeCrafter</p>
  <hr style="border:none;border-top:5px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>CodeCrafter</p>
    <p>address</p>
   </div>
  </div>
  </div>
  <p style="font-size:12px;color:#888;text-align:center;">If you don't see this email in your inbox, please check your spam folder.</p>
  </body>
  </html>
  `;
};
module.exports = otpTemplate;
