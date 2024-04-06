import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { countApplications, createApplication, editApplication, getAcceptedApplications, getApplications, getApplicationsByJob, getUserApplications } from "../controllers/application.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getApplications);
router.get("/:userId", verifyToken, getUserApplications);
router.get("/jobs/:jobId", verifyToken, getApplicationsByJob);
router.get("/admin/accepted", verifyToken, getAcceptedApplications);
router.get("/count/all", verifyToken, countApplications);

//CREATE
router.post("/create", verifyToken, createApplication);

//UPDATE
router.patch("/:applicationId/edit", verifyToken, editApplication);

export default router;