const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

exports.sendVerificationCode = async (to, code) => {
  const mailOptions = {
    from: `"BizMon" <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Your Verification Code',
    html: `<p>👋 Hello! Your <b>verification code</b> is:</p><h2>${code}</h2><p>This code will expire in 10 minutes.</p>`
  };

  await transporter.sendMail(mailOptions);
};

