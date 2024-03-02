import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getRecruiters } from "../controllers/recruiter.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getRecruiters);

export default router;