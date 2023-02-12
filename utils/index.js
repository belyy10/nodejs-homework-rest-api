const nodemailer = require("nodemailer");
// const { EMAIL_USER, EMAIL_PASS } = process.env;
async function sendMail({ to, subject, html }) {
  const email = {
    from: "info@contacts.com",
    to,
    subject,
    html,
  };
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1f0572d19f261c",
      pass: "c4ffcc440565d6",
    },
  });
  await transport.sendMail(email);
}

module.exports = sendMail;
