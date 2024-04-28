import { DataTable } from "@/components/data-table"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { columns } from "./columns"

export const RecruiterClient = ({ data, setShowModal }) => {
    const searchKeys = ["firstName", "lastName"]

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading title="Reclutadores" description="Administra a tus reclutadores" />
                <Button onClick={() => setShowModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Reclutador
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="firstName" searchKeys={searchKeys} />
        </>
    )
}