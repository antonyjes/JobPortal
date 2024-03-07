import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createJob, editJob, getJobs } from "../controllers/job.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getJobs);

//CREATE
router.post("/create", verifyToken, createJob);

//UPDATE
router.patch("/:jobId/edit", verifyToken, editJob);

export default router;