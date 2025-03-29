const express = require("express");
const { sendContactEmail } = require("../controllers/contactController");

const router = express.Router();

// POST route for submitting the contact form
router.post("/", sendContactEmail);

module.exports = router;
