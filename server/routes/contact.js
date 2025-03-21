import express from "express";
import { submitContactForm } from "../controllers/contact.js"; // Correct function name

const router = express.Router();

router.post("/contact", submitContactForm); // Match with the function in contact.js

export default router;
