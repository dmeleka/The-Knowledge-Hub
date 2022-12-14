import express from "express";
import { getAllCourses, getExam } from '../controllers/courseController.js';

const router = express.Router();

router.get('/allCourses', getAllCourses);
router.post('/getExam/:CourseTitle/:ExamTitle', getExam)


export default router;