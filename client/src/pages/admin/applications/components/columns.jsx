import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "jobTitle",
        header: "Empleo"
    },
    {
        accessorKey: "userName",
        header: "Nombre de usuario"
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