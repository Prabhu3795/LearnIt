import React from 'react';
import { motion } from "framer-motion";
import "./testimonial.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message: "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message: "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image: "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "Michael Johnson",
      position: "Student",
      message: "The course structure is perfect for working professionals. I could balance my job and upskilling easily.",
      image: "https://th.bing.com/th/id/OIP.7CqHlq3X6J7jJpYKd5X0bwHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Student",
      message: "The hands-on projects gave me real-world experience that helped me land my dream job!",
      image: "https://th.bing.com/th/id/OIP.6pOXxw5Q9X5WJYkQ5Q5Q5QHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  return (
    <section className="testimonials">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        What Our Students Say
      </motion.h2>
      
      <div className="testimonials-cards">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="student-image">
              <img src={testimonial.image} alt={testimonial.name} />
              <div className="quote-icon">"</div>
            </div>
            <p className="message">{testimonial.message}</p>
            <div className="info">
              <p className="name">{testimonial.name}</p>
              <p className="position">{testimonial.position}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;