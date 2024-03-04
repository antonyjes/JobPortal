import Job from "../models/Job.js"

//READ
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}