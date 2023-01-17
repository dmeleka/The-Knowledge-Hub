import express from "express";
import { verifyJWT } from "../controllers/authController.js";
import { getAllCourses, getExam, getSubtitles, getVideo, getExams } from '../controllers/courseController.js';

const router = express.Router();

router.get('/allCourses', getAllCourses);
router.get('/getExam/:CourseTitle/:ExamTitle', getExam)
router.get('/getVideo/:CourseTitle', getVideo)
router.get('/getSubtitles/:CourseTitle', verifyJWT, getSubtitles)
router.get('/getExams/:CourseTitle', getExams)


export default router;