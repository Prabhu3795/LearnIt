import express from 'express';
import { isAdmin, isAuth } from '../middlewares/isAuth.js';
import { 
    addLecture, 
    createCourse, 
    deleteCourse, 
    deleteLecture, 
    getAllStats 
} from '../controllers/admin.js';
import { uploadImage, uploadVideo } from '../middlewares/multer.js';

const router = express.Router();

// ✅ Create a course (with thumbnail image)
router.post('/course', isAuth, isAdmin, uploadImage, createCourse);

// ✅ Add a lecture (with video)
router.post('/course/:id', isAuth, isAdmin, uploadVideo, addLecture);

// ✅ Delete a course
router.delete('/course/:id', isAuth, isAdmin, deleteCourse);

// ✅ Delete a lecture
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);

// ✅ Get all statistics
router.get('/stats', isAuth, isAdmin, getAllStats);

export default router;
