import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const AlertModal = ({showAlert, setShowAlert, onConfirm}) => {
    return(
        <Dialog open={showAlert} onOpenChange={setShowAlert}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button variant="outline" onClick={() => setShowAlert(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}