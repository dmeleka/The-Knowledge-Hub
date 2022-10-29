import express from 'express';
import { addIndTrainee } from '../controllers/traineeController.js';

const router = express.Router();

router.post('/Register', addIndTrainee);


export default router;