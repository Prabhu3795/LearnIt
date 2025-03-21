import { Contact } from "../models/Contact.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Gmail, // Your Gmail email
        pass: process.env.Password, // Your App Password (not regular password)
      },
    });

    // Email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL, // Email where messages should be received
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Message sent & stored successfully!" });
  } catch (error) {
    console.error("Error handling contact form:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
