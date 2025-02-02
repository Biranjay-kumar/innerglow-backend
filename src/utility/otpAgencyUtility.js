import { sendEmail } from "./sendEmailVerification.js";

// Generate OTP and Save to Database
export const generateAndSaveOtp = async (agency, purpose) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const otpExpiry = Date.now() + 15 * 60 * 1000; // 10-minute expiry

  agency.otp = otp;
  agency.otpExpiry = otpExpiry;

  await agency.save();

  let subject, text, html;

  switch (purpose) {
    case "register":
      subject = `Welcome to InnerGlow!`;
      text = `Your OTP for registering with InnerGlow is: ${otp}. It is valid for 10 minutes.`;
      html = `<p>Your OTP for registering with InnerGlow is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;
      break;

    case "login":
      subject = `Login Verification - InnerGlow`;
      text = `Your OTP for logging in is: ${otp}. It is valid for 10 minutes.`;
      html = `<p>Your OTP for logging in is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;
      break;

    case "forgotPassword":
      subject = `Password Reset - InnerGlow`;
      text = `Your OTP to reset your password is: ${otp}. It is valid for 10 minutes.`;
      html = `<p>Your OTP to reset your password is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;
      break;

    default:
      throw new Error("Invalid purpose for OTP");
  }

  await sendEmail(agency.email, subject, text, html);
};

// Verify OTP
export const verifyOtp = async (agency, otp) => {
  if (!agency || !otp) {
    throw new Error("Agency or OTP is missing.");
  }

  if (agency.otpExpiry < Date.now()) {
    throw new Error("OTP has expired.");
  }

  if (agency.otp !== otp) {
    throw new Error("Invalid OTP.");
  }

  // Clear OTP fields and return true for success
  agency.otp = null;
  agency.otpExpiry = null;
  agency.isVerifiedAgency = true;
  await agency.save();

  return true;
};
