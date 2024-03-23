import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { setApplications } from "@/state";
import { Download, Edit, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"
import ModalApplication from "../ModalApplication";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const CellAction = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const [showModal, setShowModal] = useState(false);
    const { jobId } = useParams();

    const getApplications = async () => {
        const response = await fetch(`http://localhost:3003/applications/jobs/${jobId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        dispatch(setApplications({ applications: data }));
    };

    const downloadCV = (userCvPath) => {
        const cvFullPath = `http://localhost:3003/assets/cvs/${userCvPath}`;
        window.open(cvFullPath, "_blank"); 
    }

    return(
        <>  
            <ModalApplication
                showModal={showModal}
                setShowModal={setShowModal}
                currentApplication={data}
                getApplications={getApplications}
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
                        <Edit className="mr-2 h-4 w-4" />
                        Update status
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