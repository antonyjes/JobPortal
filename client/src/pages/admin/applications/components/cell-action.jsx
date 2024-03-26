import { useState } from "react"
import ModalApplication from "../ModalApplication";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CellAction = ({data}) => {
    const [showModal, setShowModal] = useState(false);

    const downloadCV = (userCvPath) => {
        const cvFullPath = `http://localhost:3003/assets/cvs/${userCvPath}`;
        window.open(cvFullPath, "_blank"); 
    }

    return(
        <>
            <ModalApplication
                key={data._id}
                showModal={showModal}
                setShowModal={setShowModal}
                currentApplication={data}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setShowModal(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        See more
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadCV(data?.userCvPath)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}