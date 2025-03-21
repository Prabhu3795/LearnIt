import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { Payment } from "../models/Payment.js";
import { User } from "../models/user.js";
import crypto from "crypto";
import { validationResult } from 'express-validator';

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({ 
    courses,
  });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  handleValidationErrors(req, res);
  const course = await Courses.findById(req.params.id);
  if (!course) 
    return res.status(404).json({
      message: "Course not found",
    });
  res.json({ 
    course,
  });
});

export const fetchLectures = TryCatch(async (req, res) => {
  handleValidationErrors(req, res);
  const lectures = await Lecture.find({ course: req.params.id });
  const user = await User.findById(req.user._id);
  if (user.role == "admin")
    return res.json({ 
      lectures,
    });
  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "Please subscribe to view lectures",
    });
  res.json({
    lectures,
  });
});

export const fetchLecture = TryCatch(async (req, res) => {
  handleValidationErrors(req, res);
  const lecture = await Lecture.findById(req.params.id);
  const user = await User.findById(req.user._id);
  if (user.role == "admin")
    return res.json({ 
      lecture,
    });
  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "Please subscribe to view lectures",
    });
  res.json({
    lecture,
  });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({_id: req.user.subscription });
  res.json({
    courses,
  });
});

export const checkout = TryCatch(async (req, res) => {
  handleValidationErrors(req, res);

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  const course = await Courses.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({ message: "You have already subscribed to this course" });
  }

  try {
    // Generate a short unique receipt ID (Max 40 characters)
    const receiptId = `order_${course._id.toString().slice(-8)}_${Date.now().toString().slice(-5)}`;

    const options = {
      amount: Number(course.price * 100), // Convert price to paise
      currency: "INR",
      receipt: receiptId, // Use shortened receipt ID
    };

    const order = await instance.orders.create(options);

    res.status(201).json({
      success: true,
      order,
      course,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Error processing payment", error: error.message });
  }
});



export const paymentVerification = TryCatch(async (req, res) => {
  const{razorpay_order_id,razorpay_payment_id,razorpay_signature,createdAt} = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", process.env.Razorpay_Secret).update(body).digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);
    user.subscription.push(course._id);
    await user.save();
    res.status(200).json({
      message: "Payment successful",
    });
  }
  else{
    return res.status(400).json({
      message: "Payment verification failed",
    });
  }
});
