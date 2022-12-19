import express from 'express';
import { addIndTrainee, rateInstructor, rateCourse } from '../controllers/traineeController.js';

const router = express.Router();

router.post('/Register', addIndTrainee);
router.post('/rateInstructor/:username', rateInstructor);
router.post('/rateCourse/:title', rateCourse);

export default router;