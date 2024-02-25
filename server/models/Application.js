import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
    {
        jobId: String,
        userId: String,
        userName: String,
        userCvPath: {type: String, default: ""},
        notes: String, 
        status: String,
    },
    {timestamps: true}
);

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;