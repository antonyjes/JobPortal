import { DataTable } from "@/components/data-table"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { columns } from "./columns"

export const ApplicationClient = ({ data }) => {
    return(
        <>
            <div className="flex items-center justify-between">
                <Heading title="Accepted Applications" description="Manage your applications" />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="jobTitle" />
        </>
    )
}