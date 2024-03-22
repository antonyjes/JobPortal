import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { setApplications } from "@/state";
import { Download, Edit, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"

export const CellAction = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const getApplications = async () => {
        const response = await fetch(`http://localhost:3003/applications/${jobId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        dispatch(setApplications({ applications: data }));
    };

    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Update status
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}