import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        location: String,
        category: String,
        requirements: Array,
        jobType: String,
        status: String,
        salary: Number,
        recruiterId: String,
        recruiterName: String,
    },
    {timestamps: true}
);

const Job = mongoose.model("Job", JobSchema);
export default Job;