import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutUser from "../LayoutUser";
import { JobDetails } from "@/components/job-details";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "@/state";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const UserJob = () => {
    const [jobData, setJobData] = useState([]);
    const { jobId } = useParams();
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const userJobs = useSelector((state) => state.jobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getPublicJob = async () => {
        const response = await fetch(`http://localhost:3003/jobs/${jobId}/public`, {
            method: "GET",
        });

        const data = await response.json();
        setJobData(data);
    };

    const getUserJobs = async () => {
        const response = await fetch(`http://localhost:3003/applications/${userId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        dispatch(setJobs({ jobs: data }));
    }
    
    const onApply = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3003/applications/create", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jobId: jobId,
                userId: userId,
            })
        });

        const savedApply = await response.json();

        if (savedApply) {
            toast.success("Job aplied!");
            navigate("/user/home");
        }
    }

    useEffect(() => {
        getPublicJob();
        getUserJobs();
    }, [])

    if (!jobData) return null;

    const userJobFilter = userJobs.filter((userJob) => userJob.jobId == jobData._id);

    return(
        <LayoutUser>
            <JobDetails jobData={jobData} />
            <div className="flex justify-center mt-4">
                {
                    userJobFilter.length > 0 ? (
                        <p className="px-8 text-center text-sm text-muted-foreground">You&apos;ve already aplied for this job.</p>
                    ) : (
                        <Button onClick={(e) => onApply(e)}>Apply Job</Button>
                    )
                }
            </div>            
        </LayoutUser>
    )
}

export default UserJob