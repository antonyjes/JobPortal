import { Building2, UserRound, UsersRound } from "lucide-react"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LayoutAdmin from "./LayoutAdmin"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const AdminMain = () => {
    const token = useSelector((state) => state.token);
    const [totalRecruiters, setTotalRecruiters] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalApplications, setTotalApplications] = useState(0);

    const countRecruiters = async () => {
        const response = await fetch("http://localhost:3003/recruiters/count/all", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });

        const data = await response.json();
        setTotalRecruiters(data);
    }

    const countJobs = async () => {
        const response = await fetch("http://localhost:3003/jobs/count/all", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setTotalJobs(data);
    }

    const countApplications = async () => {
        const response = await fetch("http://localhost:3003/applications/count/all", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setTotalApplications(data);
    }

    useEffect(() => {
        countRecruiters();
        countJobs();
        countApplications();
    }, []);

    return(
        <LayoutAdmin>
            <div className="space-y-4 p-8 pt-6">
                <Heading title="Dashboard Admin" description="Overview your status" />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Recruiters
                            </CardTitle>
                            <UserRound className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalRecruiters}
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
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Applicants
                            </CardTitle>
                            <UsersRound className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalApplications}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Separator />
                <div className="flex justify-center">
                    {/* BAR CHART FOR JOBS AND STATUS OF APPLICATIONS */}
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default AdminMain;