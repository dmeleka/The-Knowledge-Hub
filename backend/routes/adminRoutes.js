import express from "express";
import { addAdmin, addInstructor, addCorpTrainee, getAllreport, getAllcourserequest, updatereport, updatecourserequest } from '../controllers/adminController.js';

const router = express.Router();

router.post('/addAdmin', addAdmin);
router.post('/addInstructor', addInstructor);
router.post('/addTrainee', addCorpTrainee);
router.get('getreports',getAllreport);
router.get('getCourseRequests',getAllcourserequest);
router.post('updateReport',updatereport);
router.post('updateCourseRequest',updatecourserequest);

export default router;