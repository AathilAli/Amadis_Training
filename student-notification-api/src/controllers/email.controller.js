const { sendEmail } = require("../services/email.service");

async function sendTestEmail(request, reply) {

    await sendEmail(
        "aathilali06@gmail.com",
        "Test Email",
        "Hello! This email was sent using Nodemailer."
    );

    return {
        message: "Email sent successfully"
    };
}

module.exports = {
    sendTestEmail
};