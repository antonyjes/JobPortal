import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {type: String, unique: true},
        password: String,
        role: String,
        picturePath: {type: String, default: ""},
    },
    {timestamps: true}
);

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);
export default Recruiter;