import { useState } from "react";
import axios from "axios";
import "./contact.css";

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

      // ✅ Reset form immediately after success
      setFormData({ name: "", email: "", message: "" });

      // ✅ Manually reset the form fields
      e.target.reset();  

    } catch (error) {
      setStatus("Error sending message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Message:</label>
        <textarea 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status && <p className={status.includes("Error") ? "error" : "success"}>{status}</p>}
    </div>
  );
};

export default ContactPage;
