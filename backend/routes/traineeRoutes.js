import express from 'express';
import { verifyJWT } from '../controllers/authController.js';
import { addIndTrainee, rateInstructor, rateCourse, enrolledCourses, enroll, updateProgress, isEnrolled, isLoggedIn, reqRefund } from '../controllers/traineeController.js';

const router = express.Router();

router.post('/Register', addIndTrainee);
router.post('/reqRefund', reqRefund);
router.get('/getWallet', getWallet);
router.post('/enroll/:title', verifyJWT, enroll);
router.post('/updateProgress/:courseTitle/:examTitle', verifyJWT, updateProgress);
router.post('/rateInstructor/:username', rateInstructor);
router.post('/rateCourse/:title', rateCourse);
router.get('/enrolledCourses/:username', enrolledCourses);
router.get('/isEnrolled/:title', verifyJWT, isEnrolled);
router.get('/isLoggedIn', verifyJWT, isLoggedIn);

export default router;