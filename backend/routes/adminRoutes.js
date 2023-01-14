import express from "express";
import { addAdmin, addInstructor, addCorpTrainee, sendRefund } from '../controllers/adminController.js';

const router = express.Router();

router.post('/addAdmin', addAdmin);
router.post('/addInstructor', addInstructor);
router.post('/addTrainee', addCorpTrainee);
router.post('/sendRefund', sendRefund);

export default router;