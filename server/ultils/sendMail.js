const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = asyncHandler(async (email, html, subject) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"Cuahangdientu" <no-relply@cuahangdientu.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });

  return info
});

module.exports = sendMail
