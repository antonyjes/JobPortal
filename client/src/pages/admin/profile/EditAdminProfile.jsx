import { LayoutProfile } from "@/components/layout-profile";
import LayoutAdmin from "../LayoutAdmin";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";

const EditAdminProfile = () => {
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [imageFilename, setImageFilename] = useState(user?.picturePath || "");
  const [imageValue, setImageValue] = useState("");

  const handleImageChange = (files) => {
    setImageValue(files[0]);
    setImageFilename(files[0].name);
  };

  return (
    <LayoutAdmin>
      <LayoutProfile>
        <form>
          <div className="grid gap-2 grid-cols-2 mb-4">
            <div className="grid gap-1">
              <Label>First Name</Label>
              <Input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="grid gap-1">
              <Label>Last Name</Label>
              <Input
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
          <div className="grid gap-1 mb-4">
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
                  <input {...getInputProps()} type="file" className="hidden" />
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
                          <span className="font-semibold">Click to upload</span>{" "}
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
          <div className="space-x-2 flex items-center justify-end w-full">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </LayoutProfile>
    </LayoutAdmin>
  );
};

export default EditAdminProfile;
