import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "firstName",
        header: "Nombres"
    },
    {
        accessorKey: "lastName",
        header: "Apellidos"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "picturePath",
        header: "Foto de perfil",
        cell: ({row}) => (
            <div className="flex items-center">
                <img className="w-[6rem] h-[6rem] p-2 object-cover rounded-full" src={`http://localhost:3003/assets/recruiters/${row.original.picturePath}`} />
            </div>
        )
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original} />
    }
]