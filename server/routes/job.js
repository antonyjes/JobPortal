import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createJob, deleteJob, editJob, getJob, getJobs, getPublicJobs } from "../controllers/job.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getJobs);
router.get("/public", getPublicJobs);
router.get("/:jobId", verifyToken, getJob);

//CREATE
router.post("/create", verifyToken, createJob);

//UPDATE
router.patch("/:jobId/edit", verifyToken, editJob);

//DELETE
router.delete("/:jobId/delete", verifyToken, deleteJob);

export default router;