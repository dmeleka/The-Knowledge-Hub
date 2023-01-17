import express from 'express';
import { setCountry, login, search, coursesFilter, view, changePassword, resetPassword, forgotPassword, authResetPassword, searchView, createreport } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/setCountry', setCountry);
router.post('/forgotPassword', forgotPassword);
router.put('/changePassword', changePassword);
router.get('/resetPassword/:id/:token', authResetPassword);
router.put('/resetPassword/:id/:token', resetPassword);
router.post('/search', search);
router.post('/createReport', createreport);
router.get('/search/:search', searchView);
router.get('/courseFilter', coursesFilter);
router.get('/view/:view', view);


export default router;