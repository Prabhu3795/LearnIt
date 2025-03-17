import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;
app.get('/',(req,res)=>{
 res.send("server is working");
});
import userRoutes from "./routes/user.js";

app.use("/api", userRoutes);

connectDb().then(() => {
    try {
      app.listen(port, () => {
        console.log(`✅ Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error("❌ Server failed to start:", error);
    }
  }).catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
  
  
  
  
  
  
  
  