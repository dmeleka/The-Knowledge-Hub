import express from "express";
import { addAdmin, addInstructor, addCorpTrainee } from '../controllers/adminController.js';

const router = express.Router();

router.post('/addAdmin', addAdmin);
router.post('/addInstructor', addInstructor);
router.post('/addTrainee', addCorpTrainee);

export default router;