import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteRecruiter, getRecruiters } from "../controllers/recruiter.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getRecruiters);

//DELETE
router.delete("/:recruiterId/delete", verifyToken, deleteRecruiter);

export default router;