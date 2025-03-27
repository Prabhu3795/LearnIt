import { useState } from "react";
import axios from "axios";
import "./contact.css";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      setStatus(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      e.target.reset();  
    } catch (error) {
      setStatus("Error sending message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="contact-container"
    >
      <h2>Contact Us</h2>
      
      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label>Message:</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.div>
      </form>

      {status && (
        <motion.p 
          className={status.includes("Error") ? "error" : "success"}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {status}
        </motion.p>
      )}
      
      <div className="contact-info">
        <motion.div 
          className="info-card"
          whileHover={{ scale: 1.05 }}
        >
          <h3>Email</h3>
          <p>learnit1591@gmail.com</p>
        </motion.div>
        
        <motion.div 
          className="info-card"
          whileHover={{ scale: 1.05 }}
        >
          <h3>Hours</h3>
          <p>Mon-Fri: 9AM-6PM</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;