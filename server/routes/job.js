import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getJobs } from "../controllers/job.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getJobs);

export default router;