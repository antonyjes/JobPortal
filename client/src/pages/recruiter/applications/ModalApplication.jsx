import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalApplication = ({showModal, setShowModal, currentApplication, getApplications}) => {
    const [status, setStatus] = useState(currentApplication?.status || "");
    const [notes, setNotes] = useState(currentApplication?.notes || "");
    const token = useSelector((state) => state.token);

    const handleChangeEditor = (value) => {
        setNotes(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3003/applications/${currentApplication?._id}/edit`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                notes: notes,
                status: status,
            })
        });

        const updatedApplication = await response.json();

        if (updatedApplication) {
            setShowModal(false);
            toast.success("Application updated!");
            getApplications();
        }
    }
    
    return(
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2 pb-4">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-1 mb-4">
                            <Label>Applicant</Label>
                            <Input disabled value={currentApplication?.userName} />
                        </div>
                        <div className="grid gap-1 mb-4">
                            <Label>Status</Label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-md border border-input text-sm">
                                <option value="">Select a status:</option>
                                <option value="Sent">Sent</option>
                                <option value="Seen">Seen</option>
                                <option value="Inverview">Interview</option>
                                <option value="Selected">Selected</option>
                            </select>
                        </div>
                        <div className="grid gap-1 mb-4">
                            <Label>Notes</Label>
                            <ReactQuill
                                theme="snow"
                                value={notes}
                                onChange={handleChangeEditor}
                                className="h-[8rem]"
                            />
                        </div>
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full mt-10">
                            <Button type="submit">Continue</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ModalApplication;