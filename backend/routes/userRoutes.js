import express from 'express';
import { setCountry, login, search, coursesFilter, view } from '../controllers/userController.js';

const router = express.Router();

router.post('/Login', login);
router.post('/setCountry', setCountry);
router.get('/search', search);
router.get('/courseFilter', coursesFilter);
router.get('/view', view);


export default router;