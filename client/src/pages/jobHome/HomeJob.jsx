import { useEffect, useState } from "react";
import LayoutHome from "../LayoutHome";
import { useParams } from "react-router-dom";
import { JobDetails } from "@/components/job-details";

const HomeJob = () => {
    const [jobData, setJobData] = useState([]);
    const { jobId } = useParams()

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
        </LayoutHome>
    )
}

export default HomeJob;