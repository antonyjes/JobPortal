import { setJobs } from "@/state";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import LayoutRecruiter from "../LayoutRecruiter";
import { JobClient } from "./components/client";

const JobsPage = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobs);
    const token = useSelector((state) => state.token);

    const getJobs = async () => {
        const response = await fetch("http://localhost:3003/jobs", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });

        const data = await response.json();
        dispatch(setJobs({ jobs: data }));
    }

    useEffect(() => {
        getJobs()
    }, []);

    return(
        <>
            <LayoutRecruiter>
                <div className="flex-col">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <JobClient data={jobs} />
                    </div>
                </div>
            </LayoutRecruiter>
        </>
    )
}

export default JobsPage;