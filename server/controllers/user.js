import User from "../models/User.js";
import fs from "fs-extra";
import bcrypt from "bcrypt";

//UPDATE
export const editUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const {firstName, lastName, email, password, roleJob, city} = req.body;
        const user = await User.findById(userId);

        let picturePath = user.picturePath;
        let cvPath = user.cvPath;
        let passwordHash;

        const pictureFile = req.files['picture'][0];
        const cvFile = req.files['cvFile'][0];

        if (pictureFile) {
            fs.unlink("./public/assets/users/" + picturePath, function (err){
                if (err) throw err;
                console.log("Image deleted!");
            });
            picturePath = pictureFile.filename;
        }

        if (cvFile) {
            fs.unlink("./public/assets/cvs/" + cvPath, function (err){
                if (err) throw err;
                console.log("CV file deleted!");
            });
            cvPath = cvFile.filename;
        }

        if (password !== "") {
            const salt = await bcrypt.genSalt();
            passwordHash = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            email,
            picturePath,
            roleJob,
            city,
            cvPath,
            ...(password && { password: passwordHash }),
        }, {new: true});

        delete updatedUser.password;
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}