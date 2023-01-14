import express from 'express';
import { addIndTrainee, getWallet, reqRefund } from '../controllers/traineeController.js';


const router = express.Router();

router.post('/Register', addIndTrainee);
router.post('/reqRefund', reqRefund);
router.get('/getWallet', getWallet);

export default router;