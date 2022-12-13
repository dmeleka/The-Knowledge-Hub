import express from 'express';
import { addIndTrainee,rateInstructor,rateCourse,watchVideo} from '../controllers/traineeController.js';

const router = express.Router();

router.post('/Register', addIndTrainee);
router.post('/rateInstructor',rateInstructor);
router.post('/rateCourse',rateCourse);
router.get('/watchvideo',watchVideo);
router.get('/openItems',openItems);
export default router;