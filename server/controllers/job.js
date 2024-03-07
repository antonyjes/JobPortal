import Job from "../models/Job.js"
import Recruiter from "../models/Recruiter.js"

//READ
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

//CREATE
export const createJob = async (req, res) => {
    try {
        const {title, description, location, category, requirements, jobType, status, salary, recruiterId} = req.body;
        const recruiter = await Recruiter.findById(recruiterId);
        const newJob = new Job({
            title,
            description,
            location,
            category,
            requirements,
            jobType,
            status,
            salary,
            recruiterId,
            recruiterName: `${recruiter.firstName} ${recruiter.lastName}`,
        });
        const savedJob = await newJob.save();
        res.status(200).json(savedJob);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}