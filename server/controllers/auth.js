import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Recruiter from "../models/Recruiter.js"
import jwt from "jsonwebtoken";

//REGISTER
export const registerAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: passwordHash,
            role: "Admin",
            picturePath: req.file ? req.file.filename : "",
        });
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const registerUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password, roleJob, city} = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const pictureFile = req.files['picture'][0];
        const cvFile = req.files['cvFile'][0];

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            role: "User",
            picturePath: pictureFile ? pictureFile.filename : "",
            roleJob,
            city,
            cvPath: cvFile ? cvFile.filename : "",
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//LOGIN
export const login = async (req, res) => {
    try {
        let user;
        const {email, password} = req.body;
        
        const isUser = await User.findOne({ email: email })
        const isAdmin = await Admin.findOne({ email: email })
        const isRecruiter = await Recruiter.findOne({ email: email })

        if (isUser) {
            user = isUser;
        } else if (isAdmin) {
            user = isAdmin;
        } else if (isRecruiter) {
            user = isRecruiter
        } else {
            return res.status(401).json({ msg: "User doesn't exits."})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}