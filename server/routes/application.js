import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserApplications } from "../controllers/application.js";

const router = express.Router();

//READ
router.get("/:userId", verifyToken, getUserApplications);

export default router;