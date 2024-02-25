import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")))
mongoose.set("strictQuery", true);

// FILE STORAGE
const adminStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/admins");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
})

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/users");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
})

const recruiterStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/recruiters");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
})

const cvStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/cvs");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
})

const adminUpload = multer({ storage: adminStorage });
const userUpload = multer({ storage: userStorage });
const recruiterUpload = multer({ storage: recruiterStorage });
const cvUpload = multer({ storage: cvStorage });

//ROUTE WITH FILES