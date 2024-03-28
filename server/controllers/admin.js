import Admin from "../models/Admin.js";
import fs from "fs-extra";
import bcrypt from "bcrypt";

//UPDATE
export const editAdmin = async (req, res) => {
    try {
        const {adminId} = req.params;
        const {firstName, lastName, email, password} = req.body;
        const admin = await Admin.findById(adminId);

        let picturePath = admin.picturePath;
        let passwordHash;

        if (req.file) {
            fs.unlink("./public/assets/admins/" + picturePath, function (err){
                if (err) throw err;
                console.log("File deleted!");
            });
            picturePath = req.file.filename;
        }

        if (password !== "") {
            const salt = await bcrypt.genSalt();
            passwordHash = await bcrypt.hash(password, salt);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, {
            firstName,
            lastName,
            email,
            picturePath: picturePath,
            ...(password && { password: passwordHash }),
        }, {new: true});

        delete updatedAdmin.password;
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}