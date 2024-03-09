import Job from "../models/Job.js";
import Recruiter from "../models/Recruiter.js";

//READ
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPublicJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "Open" });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const getJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    res.status(201).json(job);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//CREATE
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      category,
      requirements,
      jobType,
      status,
      salary,
      recruiterId,
    } = req.body;
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
    res.status(409).json({ message: error.message });
  }
};

//UPDATE
export const editJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const {
      title,
      description,
      location,
      category,
      requirements,
      jobType,
      status,
      salary,
      recruiterId,
    } = req.body;
    const recruiter = await Recruiter.findById(recruiterId);
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
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
      },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//DELETE
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedJob = await Job.findByIdAndDelete(jobId);
    res.status(200).json(deletedJob);
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
