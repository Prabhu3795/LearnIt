import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";
import fs from "fs"; 

dotenv.config();

// Ensure upload directories exist
const uploadDirectories = ["uploads", "uploads/lectures", "uploads/thumbnails"];
uploadDirectories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📂 Created directory: ${dir}`);
  }
});

// Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
app.use("/uploads", express.static("uploads"));
app.use("/uploads/lectures", express.static("uploads/lectures"));
app.use("/uploads/thumbnails", express.static("uploads/thumbnails"));

// Importing Routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";
import contactRoutes from "./routes/contact.js";  // ✅ Added contact route

// Using Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);
app.use("/api", contactRoutes);  // ✅ Added contact API

app.get("/", (req, res) => {
  res.send("Server is working");
});

// Connect to Database and Start Server
connectDb()
  .then(() => {
    try {
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`✅ Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error("❌ Server failed to start:", error);
    }
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
