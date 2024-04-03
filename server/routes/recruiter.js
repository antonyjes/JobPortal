import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { countRecruiters, deleteRecruiter, getRecruiters } from "../controllers/recruiter.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getRecruiters);
router.get("/count/all", verifyToken, countRecruiters);

//DELETE
router.delete("/:recruiterId/delete", verifyToken, deleteRecruiter);

export default router;