import { DataTable } from "@/components/data-table"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { columns } from "./columns"

export const ApplicationClient = ({ data }) => {
    return(
        <>
            <div className="flex items-center justify-between">
                <Heading title="Aplicantes Aceptados" description="Ver todos los aplicantes aceptados" />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="jobTitle" />
        </>
    )
}