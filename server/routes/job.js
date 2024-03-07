import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createJob, getJobs } from "../controllers/job.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getJobs);

//CREATE
router.post("/create", verifyToken, createJob);

export default router;