import LayoutMain from "./LayoutMain"
import { Building2, UserRound, UsersRound } from "lucide-react"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AdminMain = () => {
    const items = [
        {title: "Dashboard", href: "/homeAdmin"},
        {title: "Recruiters", href: "/recruiters"},
        {title: "Applicants", href: "/applicants"}
    ]

    return(
        <LayoutMain items={items}>
            <div className="space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="Overview your status" />
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
                                {10}
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
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Applicants
                            </CardTitle>
                            <UsersRound className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {210}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </LayoutMain>
    )
}

export default AdminMain;