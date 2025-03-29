# LearnIt - E-Learning Web Application

## 📌 Overview
LearnIt is a MERN (MongoDB, Express.js, React.js, Node.js) stack-based e-learning platform designed to facilitate online learning. It enables students to enroll in courses, track progress, and receive certifications while allowing instructors to create and manage course content.

## ✨ Features
### 🔹 Functional Features
- **User Authentication & Authorization**: Secure login and role-based access control for students and instructors.
- **Course Management**: Instructors can create, edit, and delete courses, while students can browse, enroll, and complete courses.
- **User Dashboard**: Personalized dashboards for students and instructors to track progress and engagement.
- **Quizzes & Assessments**: Auto-graded quizzes and manual assignments.
- **Payment & Subscription**: Secure online payment for course enrollment.
- **Live Sessions & Forums**: Integration with Zoom/Google Meet and discussion forums for collaboration.
- **Notifications & Announcements**: Email and in-app updates for courses and activities.
- **Review & Rating System**: Feedback from students to improve course content.
- **Certificate Generation**: Automated certificates upon course completion.

### 🔹 Non-Functional Features
- **Performance**: Optimized for handling 1000+ concurrent users.
- **Security**: Data encryption, JWT authentication, and protection against attacks.
- **Scalability**: Load balancing and caching mechanisms.
- **Usability**: Mobile-friendly and accessible UI.
- **Availability**: 99.9% uptime with automated backups.

## 🏗️ Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe/Razorpay
- **Video Conferencing**: Zoom/Google Meet API
- **Deployment**: Vercel (Frontend), Heroku/AWS (Backend)

## 🚀 Installation & Setup
### Prerequisites:
- Node.js & npm
- MongoDB (Local or Atlas)

### Steps:
1. **Clone the repository**
   ```bash
   git clone https://github.com/NiceNewton/learnit.git
   cd learnit
   ```
2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   ```
3. **Configure environment variables**
   - Create a `.env` file in the root directory and add the following:
     ```env
     MONGO_URI=your_mongo_db_uri
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET=your_stripe_secret
     ```
4. **Run the application**
   ```bash
   npm run dev
   ```

## 📌 Folder Structure
```
learnit/
├── client/   # React frontend
├── server/   # Node.js backend
│   ├── models/  # Database schemas
│   ├── routes/  # API endpoints
│   ├── controllers/  # Business logic
│   ├── middlewares/  # Authentication & security
├── uploads/   # User-uploaded files
├── package.json
└── README.md
```

## 🤝 Contributors
- Nice Newton
- Adarsh Narayan
- Satya Narayan Mohanty
- Om Sethy
- Prabhu Prasad Pattnayak
- Somrita Das
- Swaroop Kumar
- 
## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
🚀 Happy Learning!



Online lerning platform using MERN stack
![alt text](image.png)
