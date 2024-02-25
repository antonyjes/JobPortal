import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        location: String,
        category: String,
        industry: String,
        jobType: String,
        salary: Number,
        recruiterId: String,
        recruiterName: String,
    },
    {timestamps: true}
);

const Job = mongoose.model("Job", JobSchema);
export default Job;