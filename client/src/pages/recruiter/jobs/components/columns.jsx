import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "location",
        header: "Location"
    },
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        accessorKey: "jobType",
        header: "Type of Job"
    },
    {
        accessorKey: "salary",
        header: "Salary"
    },
    {
        accessorKey: "recruiterName",
        header: "Created by"
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original} />
    }
]