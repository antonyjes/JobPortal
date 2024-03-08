import { useState } from "react";
import LayoutRecruiter from "../../LayoutRecruiter";
import JobForm from "./JobForm";

const NewJob = () => {
    const [jobData, setJobData] = useState(null);

    return(
        <LayoutRecruiter>
            <JobForm jobData={jobData} setJobData={setJobData} />
        </LayoutRecruiter>
    )
}

export default NewJob;