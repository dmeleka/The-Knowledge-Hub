import express from "express";
import { addAdmin } from '../controllers/adminController.js';
import { addInstructor } from "../controllers/adminController.js";

const router = express.Router();

router.post('/addAdmin', addAdmin);
router.post('/addInstructor', addInstructor);

export default router;