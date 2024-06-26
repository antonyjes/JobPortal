import { DataTable } from "@/components/data-table"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { columns } from "./columns"
import { useNavigate } from "react-router-dom"

export const JobClient = ({ data }) => {
    const navigate = useNavigate();
    const searchKeys = ["title", "location", "category", "jobType"];

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading title="Empleos" description="Administra tus empleos" />
                <Button onClick={() => navigate("/recruiter/jobs/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir empleo
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="title" searchKeys={searchKeys} />
        </>
    )
}