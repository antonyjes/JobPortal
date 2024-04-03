import Application from "../models/Application.js";
import User from "../models/User.js";
import Job from "../models/Job.js";

//READ
export const getUserApplications = async (req, res) => {
    try {
        const { userId } = req.params;
        const applications = await Application.find({ userId: userId });
        res.status(201).json(applications);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getApplicationsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ jobId: jobId });
        res.status(201).json(applications);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getAcceptedApplications = async (req, res) => {
    try {
        const applications = await Application.find({ status: "Selected" });
        res.status(201).json(applications);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const countApplications = async (req, res) => {
    try {
        const totalApplications = await Application.countDocuments({});
        res.status(201).json(totalApplications);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//CREATE
export const createApplication = async (req, res) => {
    try {
        const {jobId, userId} = req.body;
        const user = await User.findById(userId);
        const job = await Job.findById(jobId);
        const newApplication = new Application({
            jobId,
            jobTitle: job.title,
            userId,
            userName: `${user.firstName} ${user.lastName}`,
            userCvPath: user.cvPath,
            notes: "",
            status: "Sent",
        });
        const savedApplication = await newApplication.save();
        res.status(200).json(savedApplication);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//UPDATE
export const editApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const {notes, status} = req.body;
        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            {
                notes,
                status
            },
            {new: true}
        );
        res.status(201).json(updatedApplication);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}