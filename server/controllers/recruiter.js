import Recruiter from "../models/Recruiter.js"
import bcrypt from "bcrypt";
import fs from "fs-extra";
import Job from "../models/Job.js"

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

//EDIT
export const editRecruiter = async (req, res) => {
    try {
        const {recruiterId} = req.params;
        const {firstName, lastName, email, password} = req.body;
        const recruiter = await Recruiter.findById(recruiterId);

        let picturePath = recruiter.picturePath;
        let passwordHash;

        if (req.file) {
            fs.unlink("./public/assets/recruiters/" + picturePath, function (err) {
                if (err) throw err;
                console.log("File deleted!");
            });
            picturePath = req.file.filename;
        }

        if (password !== "") {
            const salt = await bcrypt.genSalt();
            passwordHash = await bcrypt.hash(password, salt);
        }

        const updatedRecruiter = await Recruiter.findByIdAndUpdate(recruiterId, {
            firstName,
            lastName,
            email,
            picturePath: picturePath,
            ...(passwordHash && { password: passwordHash }),
        }, {new: true});

        await Job.updateMany(
            { recruiterId: recruiterId },
            { recruiterName: `${firstName} ${lastName}`}
        );

        res.status(200).json(updatedRecruiter);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

//DELETE
export const deleteRecruiter = async (req, res) => {
    try {
        const { recruiterId } = req.params;
        const deletedRecruiter = await Recruiter.findByIdAndDelete(recruiterId);
        const filePath = "./public/assets/recruiters/" + deletedRecruiter.picturePath;

        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, function (err) {
                if (err) throw err;
                console.log("File deleted!");
            })
        }

        res.status(200).json(deletedRecruiter);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}