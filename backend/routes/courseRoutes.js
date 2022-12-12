import express from "express";
import { getAllCourses} from '../controllers/courseController.js';

const router = express.Router();

router.get('/allCourses', getAllCourses);


export default router;