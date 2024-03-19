import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { registerAdmin, registerUser } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import recruiterRoutes from "./routes/recruiter.js";
import jobRoutes from "./routes/job.js";
import applicationRoutes from "./routes/application.js";
import { createRecruiter, editRecruiter } from "./controllers/recruiter.js";
import { verifyToken } from "./middleware/auth.js";

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
mongoose.set("strictQuery", true);

// FILE STORAGE
const adminStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/admins");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "picture") {
      cb(null, "public/assets/users")
    } else if (file.fieldname === "cvFile") {
      cb(null, "public/assets/cvs")
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const recruiterStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/recruiters");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const adminUpload = multer({ storage: adminStorage });
const userUpload = multer({ storage: userStorage });
const recruiterUpload = multer({ storage: recruiterStorage });

//ROUTE WITH FILES
app.post("/auth/admin/register", adminUpload.single("picture"), registerAdmin);
app.post(
  "/auth/user/register",
  userUpload.fields([{name: "picture", maxCount: 1}, {name: "cvFile", maxCount: 1}]),
  registerUser
);
app.post("/recruiters/create", recruiterUpload.single("picture"), createRecruiter);
app.patch("/recruiters/:recruiterId/edit", verifyToken, recruiterUpload.single("picture"), editRecruiter);

//ROUTES
app.use("/auth", authRoutes);
app.use("/recruiters", recruiterRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);

//MOONGOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => console.log(error));
