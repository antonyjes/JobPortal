import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "jobTitle",
        header: "Job"
    },
    {
        accessorKey: "userName",
        header: "Username"
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