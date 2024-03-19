import Application from "../models/Application.js";

// READ
export const getUserApplications = async (req, res) => {
    try {
        const { userId } = req.params;
        const applications = await Application.find({ userId: userId });
        res.status(201).json(applications);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}