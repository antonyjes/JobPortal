import { useEffect, useState } from "react";
import LayoutHome from "../LayoutHome";
import { useNavigate, useParams } from "react-router-dom";
import { JobDetails } from "@/components/job-details";
import { Button } from "@/components/ui/button";

const HomeJob = () => {
    const [jobData, setJobData] = useState([]);
    const { jobId } = useParams()
    const navigate = useNavigate()

    const getPublicJob = async () => {
        const response = await fetch(`http://localhost:3003/jobs/${jobId}/public`, {
            method: "GET",
        });

        const data = await response.json();
        setJobData(data);
    };

    useEffect(() => {
        getPublicJob()
    }, [])

    if (!jobData) return null;

    return(
        <LayoutHome>
            <JobDetails jobData={jobData} />
            <div className="flex justify-center mt-4">
                <Button onClick={() => navigate("/login")} className="w-[10rem]">Apply Job</Button>
            </div>
        </LayoutHome>
    )
}

export default HomeJob;