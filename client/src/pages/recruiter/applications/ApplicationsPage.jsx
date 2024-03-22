import { setApplications } from "@/state";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import LayoutRecruiter from "../LayoutRecruiter";
import { format } from "date-fns";
import { ApplicationClient } from "./components/client";

const ApplicationsPage = () => {
    const dispatch = useDispatch();
    const applications = useSelector((state) => state.applications);
    const token = useSelector((state) => state.token);
    const { jobId } = useParams();

    const getApplications = async () => {
        const response = await fetch(`http://localhost:3003/applications/${jobId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        dispatch(setApplications({ applications: data }));
    };

    useEffect(() => {
        getApplications()
    }, [])

    const formattedApplications = applications.map((application) => ({
        _id: application._id,
        jobId: application.jobId,
        jobTitle: application.jobTitle,
        userId: application.userId,
        userName: application.userName,
        userCvPath: application.userCvPath,
        notes: application.notes,
        status: application.status,
        createdAt: format(application.createdAt, "MMMM do, yyyy"),
    }))

    return(
        <LayoutRecruiter>
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ApplicationClient data={formattedApplications} />
                </div>
            </div>
        </LayoutRecruiter>
    )
}

export default ApplicationsPage;