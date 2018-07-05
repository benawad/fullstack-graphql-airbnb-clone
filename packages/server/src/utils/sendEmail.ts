import * as nodemailer from "nodemailer";

export const sendEmail = async (recipient: string, url: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  const message = {
    from: "Sender Name <sender@example.com>",
    to: `Recipient <${recipient}>`,
    subject: "Nodemailer is unicode friendly ✔",
    text: "Hello to myself!",
    html: `<html>
        <body>
        <p>Testing SparkPost - the world's most awesomest email service!</p>
        <a href="${url}">confirm email</a>
        </body>
        </html>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};
