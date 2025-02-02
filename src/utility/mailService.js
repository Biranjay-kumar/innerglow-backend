import { sendEmail } from "./sendEmailVerification.js";


const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = "Welcome to Our Platform!";
  const text = `Hi ${userName},\n\nThank you for signing up! Please verify your email by clicking the link below:\n\n[Insert Verification Link Here]\n\nBest regards,\nThe Team`;

  const html = `<p>Hi <strong>${userName}</strong>,</p>
                  <p>Thank you for signing up! Please verify your email by clicking the link below:</p>
                  <a href="[Insert Verification Link Here]">Verify Email</a>
                  <p>Best regards,<br/>The Team</p>`;

  await sendEmail(userEmail, subject, text, html);
};

// Example call
// sendWelcomeEmail("newuser@example.com", "New User");
