import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "title",
        header: "Título"
    },
    {
        accessorKey: "location",
        header: "Localización"
    },
    {
        accessorKey: "category",
        header: "Categoría"
    },
    {
        accessorKey: "jobType",
        header: "Tipo de Trabajo"
    },
    {
        accessorKey: "salary",
        header: "Salario"
    },
    {
        accessorKey: "recruiterName",
        header: "Creado por"
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original} />
    }
]