import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs";
import { promisify } from 'util';
import fs from 'fs';
import { User } from '../models/user.js';

const unlinkAsync = promisify(fs.unlink);

export const createCourse = TryCatch(async (req, res) => {
    const { title, description, category, createdBy, duration, price } = req.body;
    const image = req.file;
    if (!image) {
        return res.status(400).json({ message: "Image is required" });
    }
    const course = await Courses.create({
        title,
        description,
        category,
        createdBy,
        duration,
        price,
        image:image?.path,
    });

    res.status(200).json({
        message: "Course created successfully",
        courseId: course._id,
    });
});

import mongoose from 'mongoose';

export const addLecture = TryCatch(async (req, res) => {
    const { title, description } = req.body;
    const file = req.file;
    const courseId = req.params.id; 

    console.log("Received Course ID:", courseId);
    console.log("Request File:", file);

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: "Invalid Course ID" });
    }
    const course = await Courses.findById(courseId);
    console.log("Found Course:", course);
    
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (!file) {
        return res.status(400).json({ message: "Video file is required" });
    }
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    const lecture = await Lecture.create({
        title,
        description,
        video: file.path,  
        course: course._id,   // Correctly set course reference
    });
    console.log("Created Lecture:", lecture);

    course.lectures.push({
        _id: lecture._id,
        title,
        video: file.path,
    });

    await course.save();
    console.log("Updated Course with new Lecture");

    res.status(200).json({
        message: "Lecture added successfully",
        lecture,
    });
});

export const deleteLecture = TryCatch(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);
    rm(lecture.video, () => {
        console.log("Video deleted");
    });

    await lecture.deleteOne();
    res.json({ message: "Lecture deleted successfully" });
});

export const deleteCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
    const lectures = await Lecture.find({ course: course._id });

    await Promise.all(
        lectures.map(async (lecture) => {
            await unlinkAsync(lecture.video);
            console.log("Video deleted");
        })
    );

    rm(course.image, () => {
        console.log("Image deleted");
    });

    await Lecture.find({ course: req.params.id }).deleteMany();

    await course.deleteOne();

    await User.updateMany({}, { $pull: { subscription: req.params.id } });

    res.json({ message: "Course deleted successfully" });
});

export const getAllStats = TryCatch(async (req, res) => {
    const totalCourses =( await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {
        totalCourses,
        totalLectures,
        totalUsers,
    };  

    res.json({ stats,});
});