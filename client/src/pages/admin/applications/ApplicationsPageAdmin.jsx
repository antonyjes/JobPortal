import { setApplications } from "@/state";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import LayoutAdmin from "../LayoutAdmin";
import { ApplicationClient } from "./components/client";

const ApplicationsPageAdmin = () => {
    const dispatch = useDispatch();
    const applications = useSelector((state) => state.applications);
    const token = useSelector((state) => state.token);
    
    const getAcceptedApplications = async () => {
        const response = await fetch("http://localhost:3003/applications/admin/accepted", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        dispatch(setApplications({ applications: data }));
    };

    useEffect(() => {
        getAcceptedApplications()
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
    }));

    return(
        <LayoutAdmin>
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 py-6">
                    <ApplicationClient data={formattedApplications} />
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default ApplicationsPageAdmin;