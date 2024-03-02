import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";

const ModalRecruiter = ({
  showModal,
  setShowModal,
  operation,
  currentRecruiter,
  getRecruiters,
}) => {
  const [firstName, setFirstName] = useState(currentRecruiter.firstName || "");
  const [lastName, setLastName] = useState(currentRecruiter.lastName || "");
  const [email, setEmail] = useState(currentRecruiter.email || "");
  const [password, setPassword] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [imageFilename, setImageFilename] = useState(
    currentRecruiter.picturePath || ""
  );
  const token = useSelector((state) => state.token);

  const handleImageChange = (files) => {
    setImageValue(files[0]);
    setImageFilename(files[0].name);
  };

  const createRecruiter = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", imageValue);
    formData.append("picturePath", imageValue.name);

    const savedRecruiterResponse = await fetch(
      "http://localhost:3003/recruiters/create",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const savedRecruiter = await savedRecruiterResponse.json();

    if (savedRecruiter) {
      setShowModal(false);
      toast.success("Recruiter created!");
      getRecruiters();
    }
  };

  const editRecruiter = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", imageValue);
    formData.append("picturePath", imageFilename);

    const updatedRecruiterResponse = await fetch(
      `http://localhost:3003/recruiters/${currentRecruiter._id}/edit`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const updatedRecruiter = await updatedRecruiterResponse.json();

    if (updatedRecruiter) {
      setShowModal(false);
      toast.success("Recruiter updated!");
      getRecruiters();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (operation === "Create") await createRecruiter();
    if (operation === "Edit") await editRecruiter();
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{operation}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 grid-cols-2 mb-4">
              <div className="grid gap-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-2 mb-4">
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div className="grid gap-1">
                <Label>Image</Label>
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="flex items-center justify-center w-full"
                    >
                      <input
                        {...getInputProps()}
                        type="file"
                        className="hidden"
                      />
                      <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          {imageFilename === "" ? (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                          ) : (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              {imageFilename}
                            </p>
                          )}
                        </div>
                      </label>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button type="submit">Continue</Button>
              </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalRecruiter;
