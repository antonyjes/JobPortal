import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LayoutRecruiter from "../../LayoutRecruiter";
import JobForm from "./JobForm";

const EditJob = () => {
    const token = useSelector((state) => state.token);
    const { jobId } = useParams();
    const [jobData, setJobData] = useState(null);

    const getJob = async () => {
        const response = await fetch(`http://localhost:3003/jobs/${jobId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        setJobData(data);
    };

    useEffect(() => {
        getJob()
    }, [])

    if (!jobData) return null;

    return(
        <LayoutRecruiter>
            <JobForm jobData={jobData} setJobData={setJobData} />
        </LayoutRecruiter>
    )
}

export default EditJob;