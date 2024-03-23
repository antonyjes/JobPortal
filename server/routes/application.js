import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createApplication, editApplication, getApplicationsByJob, getUserApplications } from "../controllers/application.js";

const router = express.Router();

//READ
router.get("/:userId", verifyToken, getUserApplications);
router.get("/jobs/:jobId", verifyToken, getApplicationsByJob);

//CREATE
router.post("/create", verifyToken, createApplication);

//UPDATE
router.patch("/:applicationId/edit", verifyToken, editApplication);

export default router;