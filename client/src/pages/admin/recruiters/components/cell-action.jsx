import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { setRecruiters } from "@/state";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import ModalRecruiter from "../ModalRecruiter";
import { AlertModal } from "@/components/alert-modal";
import { toast } from "react-toastify";

export const CellAction = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    
    const getRecruiters = async () => {
        const response = await fetch("http://localhost:3003/recruiters", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });

        const data = await response.json();
        dispatch(setRecruiters({ recruiters: data }))
    }

    const onDelete = async () => {
        const response = await fetch(
            `http://localhost:3003/recruiters/${data._id}/delete`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        
        console.log(response);
        setShowAlert(false);
        toast.success("Recruited deleted!");
        getRecruiters();
    }
    
    useEffect(() => {
        getRecruiters()
    }, [])

    return(
        <>
            <ModalRecruiter 
                showModal={showModal}
                setShowModal={setShowModal}
                operation="Edit"
                currentRecruiter={data}
                getRecruiters={getRecruiters}
            />
            <AlertModal
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                onConfirm={() => onDelete(data._id)}
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
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}