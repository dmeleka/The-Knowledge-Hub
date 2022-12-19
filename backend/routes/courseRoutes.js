import express from "express";
import { getAllCourses, getExam, getSubtitles, getVideo, getExams } from '../controllers/courseController.js';

const router = express.Router();

router.get('/allCourses', getAllCourses);
router.get('/getExam/:CourseTitle/:ExamTitle', getExam)
router.get('/getVideo/:CourseTitle', getVideo)
router.get('/getSubtitles/:CourseTitle', getSubtitles)
router.get('/getExams/:CourseTitle', getExams)


export default router;