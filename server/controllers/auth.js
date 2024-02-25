import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

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