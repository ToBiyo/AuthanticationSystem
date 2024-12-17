import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const emailConfirmation = async (
  name: string,
  userEmail: string,
  token: string
) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject:
        "Hello " + name + " please verify your email by clicking the link",
      html: process.env.CORS_ORIGIN + "/verifyUserMail/" + name + "/" + token,
    });
  } catch (error) {
    console.log({ message: error });
  }
};
