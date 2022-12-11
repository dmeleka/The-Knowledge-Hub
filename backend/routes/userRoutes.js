import express from 'express';
import { setCountry, login, search, coursesFilter, view, changePassword } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/setCountry', setCountry);
router.put('/changePassword', changePassword);
router.get('/search', search);
router.get('/courseFilter', coursesFilter);
router.get('/view', view);


export default router;