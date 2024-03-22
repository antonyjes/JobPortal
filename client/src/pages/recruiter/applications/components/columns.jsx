import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "userName",
        header: "Username"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        accessorKey: "createdAt",
        header: "Created at"
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original} />
    }
]