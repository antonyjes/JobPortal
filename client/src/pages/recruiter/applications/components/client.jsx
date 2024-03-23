import { DataTable } from "@/components/data-table"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { columns } from "./columns"

export const ApplicationClient = ({ data, title }) => {
    return(
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Applications for ${title}`} description="Manage your applicants for this job" />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="userName" />
        </>
    )
}