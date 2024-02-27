import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {type: String, unique: true},
        password: String,
        role: String,
        picturePath: {type: String, default: ""},
        roleJob: String,
        city: String,
        cvPath: {type: String, default: ""},
    },
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;