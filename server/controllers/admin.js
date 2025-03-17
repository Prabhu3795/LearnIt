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
    await Courses.create({
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
    });
});

export const addLecture = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);

    if (!course)
        return res.status(404).json({
            message: "Course not found",
        });
    const { title, description } = req.body;
    const file = req.file;
    const lecture = await Lecture.create({
        title,
        description,
        video: file?.path,
    });
    course.lectures.push({
        title,
        video: file?.path,
    });

    await course.save();

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