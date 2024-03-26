import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ModalApplication = ({ showModal, setShowModal, currentApplication }) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentApplication.jobTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="grid gap-1 mb-4">
            <Label>Applicant</Label>
            <Input disabled value={currentApplication?.userName} />
          </div>
          <div className="grid gap-2 mb-4">
            <div className="grid gap-1">
              <Label>Notes</Label>
              <div
                className="text-gray-700 text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: currentApplication.notes }}
              ></div>
            </div>
            <div className="grid gap-1">
              <Label>Status</Label>
              <Input disabled type="text" value={currentApplication.status} />
            </div>
          </div>
        </div>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalApplication;
