import { sendEmail } from "./sendEmailVerification.js";

// Generate OTP and Save to Database (without expiry)
export const generateAndSaveOtp = async (user, purpose) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  // Store OTP in the database without expiry
  user.otp = otp;

  await user.save();

  let subject, text, html;

  switch (purpose) {
    case "register":
      subject = `Welcome to InnerGlow!`;
      text = `Your OTP for registering with InnerGlow is: ${otp}.`;
      html = `<p>Your OTP for registering with InnerGlow is: <strong>${otp}</strong>.</p>`;
      break;

    case "login":
      subject = `Login Verification - InnerGlow`;
      text = `Your OTP for logging in is: ${otp}.`;
      html = `<p>Your OTP for logging in is: <strong>${otp}</strong>.</p>`;
      break;

    case "forgotPassword":
      subject = `Password Reset - InnerGlow`;
      text = `Your OTP to reset your password is: ${otp}.`;
      html = `<p>Your OTP to reset your password is: <strong>${otp}</strong>.</p>`;
      break;

    default:
      throw new Error("Invalid purpose for OTP");
  }

  // Send the OTP via email
  await sendEmail(user.email, subject, text, html);
};


// Verify OTP
export const verifyOtp = async (user, otp) => {
  if (!user || !otp) {
    throw new Error("User or OTP is missing.");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP.");
  }

  // Clear OTP fields and set user as verified
  user.otp = null;
  user.isVerified = true;
  await user.save();

  return true;
};
