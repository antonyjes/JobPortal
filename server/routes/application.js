import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createApplication, getUserApplications } from "../controllers/application.js";

const router = express.Router();

//READ
router.get("/:userId", verifyToken, getUserApplications);

//CREATE
router.post("/create", verifyToken, createApplication);

export default router;