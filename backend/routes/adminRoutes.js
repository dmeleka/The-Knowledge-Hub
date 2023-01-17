import express from "express";
import { addAdmin, addInstructor, addCorpTrainee, getAllReport, getAllCourseRequest, updateReport, updateCourseRequest } from '../controllers/adminController.js';

const router = express.Router();

router.post('/addAdmin', addAdmin);
router.post('/addInstructor', addInstructor);
router.post('/addTrainee', addCorpTrainee);
router.get('getreports',getAllReport);
router.get('getCourseRequests',getAllCourseRequest);
router.post('updateReport',updateReport);
router.post('updateCourseRequest',updateCourseRequest);

export default router;