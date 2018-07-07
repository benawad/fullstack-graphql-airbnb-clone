import * as nodemailer from "nodemailer";

export const sendEmail = async (
  recipient: string,
  url: string,
  linkText: string
) => {
  nodemailer.createTestAccount((err1, account) => {
    if (err1) {
      console.log(err1);
    }
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
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
        <a href="${url}">${linkText}</a>
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
  });
};
