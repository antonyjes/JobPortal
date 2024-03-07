import { useEffect, useState } from "react";
import LayoutRecruiter from "../../LayoutRecruiter";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import JobForm from "./JobForm";

const JobPage = () => {
    const { jobId } = useParams();
    const token = useSelector((state) => state.token);
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
        if (jobId !== "new") {
            getJob()
        }
    }, [])

    return(
        <LayoutRecruiter>
            <JobForm jobData={jobData} setjobData={setJobData} />
        </LayoutRecruiter>
    )
}

export default JobPage;