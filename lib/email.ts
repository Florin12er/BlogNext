import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendTwoFactorCode = async (email: string, code: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Two-Factor Authentication",
    html: `
      <h1>Two-Factor Authentication</h1>
      <p>Your two-factor authentication code is:</p>
      <h2>${code}</h2>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Two-factor code sent successfully");
  } catch (error) {
    console.error("Error sending two-factor code:", error);
    throw error;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `
      <h1>Verify Your Email</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
export const sendResetPasswordEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `
      <h1>Reset Your Password</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}">Reset Password</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
