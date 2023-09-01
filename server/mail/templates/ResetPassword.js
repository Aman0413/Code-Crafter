const resetPasswordTemplate = (link) => {
  return `<!DOCTYPE html>
    <html>
    <head>
    <base target="_top">
    </head>
    <body>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:80%;padding:20px 0">
    <div style="border-bottom:5px solid #eee">
      <a href="" style="font-size:30px;color: #f7c800;text-decoration:none;font-weight:600">SocialFlock</a>
    </div>
   
    <p style="font-size:15px">We have received a request to reset your password for your SocialFlock account. To complete the password reset process, please follow the link below:
   </p>

    <p style="font-size:15px">Please note that this link is valid for the next 30 minutes. If you did not initiate this request or no longer wish to reset your password, please ignore this email.</p>
    <p>
    ${link}
    </p>
    <p style="font-size:15px;">Regards,<br />Team SocialFlock</p>
    <hr style="border:none;border-top:5px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>SocialFlock</p>
      <p>address</p>
     </div>
    </div>
    </div>
    <p style="font-size:12px;color:#888;text-align:center;">If you don't see this email in your inbox, please check your spam folder.</p>
    </body>
    </html>
    `;
};
module.exports = resetPasswordTemplate;
