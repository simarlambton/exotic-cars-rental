const axios = require("axios");

const sendEmail = async (to, subject, text) => {
  if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_FROM) {
    console.error("SendGrid API key or email sender address is missing.");
    return { success: false, error: "Missing API key or sender email" };
  }

  const data = {
    personalizations: [{ to: [{ email: to }], subject }],
    from: { email: process.env.EMAIL_FROM },
    content: [{ type: "text/plain", value: text }],
  };

  try {
    const response = await axios.post("https://api.sendgrid.com/v3/mail/send", data, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Email sent successfully");
    return { success: true, status: response.status };
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

module.exports = sendEmail;
