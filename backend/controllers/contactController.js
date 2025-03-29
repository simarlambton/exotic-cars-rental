const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Make sure your SendGrid API key is correct

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const msg = {
    to: "simarpreetsandhu0172@gmail.com", // Your email
    from: "no-reply@exoticcars.com", // SendGrid verified email
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Message:</strong> ${message}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("SendGrid error:", error);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
};

module.exports = { sendContactEmail };
