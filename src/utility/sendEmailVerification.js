import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text, html = null) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: true,
            port: 465, // Secure port for Gmail
            auth: {
                user: process.env.EMAIL,    // Your email address
                pass: process.env.PASSWORD, // Your email password or app-specific password
            }
        });

        let mailOptions = {
            from: process.env.EMAIL, // Sender address
            to,                      // Recipient's email address
            subject,                 // Subject of the email
            text,                    // Plain text body
            html                     // Optional: HTML version of the email body
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to} with subject: "${subject}"`);

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};