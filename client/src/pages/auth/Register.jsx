import LayoutHome from "../LayoutHome";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [imageFilename, setImageFilename] = useState("");
  const [roleJob, setRoleJob] = useState("");
  const [city, setCity] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [cvFilename, setCvFilename] = useState("");

  const handleImageChange = (files) => {
    setImageValue(files[0]);
    setImageFilename(files[0].name)
  }

  const handleCvChange = (files) => {
    setFileValue(files[0]);
    setCvFilename(files[0].name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", imageValue);
    formData.append("picturePath", imageFilename);
    formData.append("roleJob", roleJob);
    formData.append("city", city);
    formData.append("cvFile", fileValue);
    formData.append("cvPath", cvFilename);

    const savedUserResponse = await fetch(
      "http://localhost:3003/auth/user/register",
      {
        method: "POST",
        body: formData,
      }
    );

    const savedUser = await savedUserResponse.json();

    if (savedUser) {
      navigate("/login");
      toast.success("User created!");
    }
  };

  return (
    <LayoutHome>
      <div className="min-h-[80vh]">
        <div className="container grid h-[80vh] w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-1 lg:px-0">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
              <div className="flex flex-col space-y-2 text-center">
                <Command className="mx-auto h-6 w-6" />
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <div className="grid gap-6">
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
                  <div className="grid gap-2 grid-cols-2 mb-4">
                    <div className="grid gap-1">
                      <Label htmlFor="roleJob">Role Job</Label>
                      <Input
                        id="roleJob"
                        type="text"
                        onChange={(e) => setRoleJob(e.target.value)}
                        value={roleJob}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                      />
                    </div>
                  </div>
                  <div className="grid gap-1 mb-4">
                    <Label>Image</Label>
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        handleImageChange(acceptedFiles)
                      }
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
                  <div className="grid gap-1">
                    <Label>Curriculum Vitae</Label>
                    <Dropzone
                      acceptedFiles=".doc,.docx,.pdf"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        handleCvChange(acceptedFiles)
                      }
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
                              {cvFilename === "" ? (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                          ) : (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              {cvFilename}
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
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Register;
