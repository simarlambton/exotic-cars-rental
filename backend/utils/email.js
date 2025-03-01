const axios = require('axios');

const sendEmail = async (to, subject, text) => {
  // // Validate environment variables
  // if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_FROM) {
  //   console.error('Error: Missing required environment variables (SENDGRID_API_KEY or EMAIL_FROM).');
  //   return;
  // }

  // Validate email parameters
  if (!to || !subject || !text) {
    console.error('Error: Missing required email parameters (to, subject, or text).');
    return;
  }

  const data = {
    personalizations: [
      {
        to: [{ email: to }],
        subject: subject,
      },
    ],
    from: { email: process.env.EMAIL_FROM },
    content: [{ type: 'text/plain', value: text }],
  };

  try {
    const response = await axios.post('https://api.sendgrid.com/v3/mail/send', data, {
      headers: {
        Authorization: `Bearer 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`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Email sent successfully:', response.status);
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
};

module.exports = sendEmail;