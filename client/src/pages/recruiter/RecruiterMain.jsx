import { Heading } from "@/components/heading";
import LayoutRecruiter from "./LayoutRecruiter";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Building2 } from "lucide-react";

const RecruiterMain = () => {
    return(
        <LayoutRecruiter>
            <div className="space-y-4 p-8 pt-6">
                <Heading title="Dashboard Recruiter" description="Overview your status" />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Applicants
                            </CardTitle>
                            <UserRound className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {120}
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
                                {5}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </LayoutRecruiter>
    )
}

export default RecruiterMain;