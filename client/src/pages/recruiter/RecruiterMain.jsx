import { Heading } from "@/components/heading";
import LayoutRecruiter from "./LayoutRecruiter";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart } from "@/components/pie-chart";

const RecruiterMain = () => {
    const token = useSelector((state) => state.token);  
    const [totalApplications, setTotalApplications] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [applicationsStatusData, setApplicationsStatusData] = useState({});
    const [jobsStatusData, setJobsStatusData] = useState({});
    
    const getApplications = async () => {
        const response = await fetch("http://localhost:3003/applications", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        const statusData = countStatusData(data);
        setApplicationsStatusData(statusData);
        setTotalApplications(data?.length);
    };

    const getJobs = async () => {
        const response = await fetch("http://localhost:3003/jobs", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        const statusData = countStatusData(data);
        setJobsStatusData(statusData);
        setTotalJobs(data?.length);
    };
    
    const countStatusData = (data) => {
        const statusCount = {};
        data.forEach(item => {
            if (statusCount[item.status]) {
                statusCount[item.status] ++;
            } else {
                statusCount[item.status] = 1;
            }
        });

        return statusCount;
    }

    useEffect(() => {
        getApplications();
        getJobs();
    }, []);

    return(
        <LayoutRecruiter>
            <div className="space-y-4 p-8 pt-6">
                <Heading title="Dashboard Recruiter" description="Overview your status" />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Applications
                            </CardTitle>
                            <UserRound className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalApplications}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Jobs
                            </CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalJobs}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Separator />
                <div className="flex flex-row gap-2">
                    {Object.keys(applicationsStatusData).length > 0 && <PieChart key={"application"} data={applicationsStatusData} title="Applications Chart" />}
                    {Object.keys(jobsStatusData).length > 0 && <PieChart key={"job"} data={jobsStatusData} title="Jobs Chart" />}
                </div>
            </div>
        </LayoutRecruiter>
    )
}

export default RecruiterMain;