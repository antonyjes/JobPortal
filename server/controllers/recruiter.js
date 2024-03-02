import Recruiter from "../models/Recruiter.js"
import bcrypt from "bcrypt";

//READ
export const getRecruiters = async (req, res) => {
    try {
        const recruiters = await Recruiter.find();
        res.status(200).json(recruiters);
    } catch (error) {
        con
        res.status(409).json({ message: error.message })
    }
}

//CREATE
export const createRecruiter = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newRecruiter = new Recruiter({
            firstName,
            lastName,
            email,
            password: passwordHash,
            role: "Recruiter",
            picturePath: req.file ? req.file.filename : "",
        });
        const savedRecruiter = await newRecruiter.save();
        res.status(201).json(savedRecruiter)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}