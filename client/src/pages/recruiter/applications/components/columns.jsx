import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "userName",
        header: "Nombre de usuario"
    },
    {
        accessorKey: "status",
        header: "Estado"
    },
    {
        accessorKey: "createdAt",
        header: "Creado"
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original} />
    }
]