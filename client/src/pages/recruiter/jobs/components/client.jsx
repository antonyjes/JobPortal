import { DataTable } from "@/components/data-table"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { columns } from "./columns"

export const JobClient = ({ data }) => {
    return(
        <>
            <div className="flex items-center justify-between">
                <Heading title="Jobs" description="Manage your jobs" />
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="title" />
        </>
    )
}