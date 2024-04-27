import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutUser from "../LayoutUser";
import { LayoutProfile } from "@/components/layout-profile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { setLogin } from "@/state";

const EditUserProfile = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [imageFilename, setImageFilename] = useState(user?.picturePath || "");
  const [roleJob, setRoleJob] = useState(user?.roleJob || "");
  const [city, setCity] = useState(user?.city || "");
  const [fileValue, setFileValue] = useState("");
  const [cvFilename, setCvFilename] = useState(user?.cvPath || "");

  const handleImageChange = (files) => {
    setImageValue(files[0]);
    setImageFilename(files[0].name);
  };

  const handleCvChange = (files) => {
    setFileValue(files[0]);
    setCvFilename(files[0].name);
  };

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

    const editUserResponse = await fetch(
      `http://localhost:3003/users/${user._id}/edit`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const updatedUser = await editUserResponse.json();

    if (updatedUser) {
      toast.success("User updated!");
      navigate("/user/home");
      dispatch(
        setLogin(
          {
            user: updatedUser,
            token: token,
          }
        )
      )
    }
  }

  return (
    <LayoutUser>
      <LayoutProfile>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2 grid-cols-2 mb-4">
            <div className="grid gap-1">
              <Label htmlFor="firstName">Nombres</Label>
              <Input
                id="firstName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="lastName">Apellidos</Label>
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
              <Label htmlFor="password">Contraseña</Label>
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
              <Label htmlFor="roleJob">Rol de trabajo</Label>
              <Input
                id="roleJob"
                type="text"
                onChange={(e) => setRoleJob(e.target.value)}
                value={roleJob}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
          </div>
          <div className="grid gap-1 mb-4">
            <Label>Foto de perfil</Label>
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
                          <span className="font-semibold">Click para subir</span>{" "}
                          o arrastra una imagen
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
              onDrop={(acceptedFiles) => handleCvChange(acceptedFiles)}
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
                      {cvFilename === "" ? (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click para subir</span>{" "}
                          o arrastra un archivo
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
            <Button type="submit">Actualizar</Button>
          </div>
        </form>
      </LayoutProfile>
    </LayoutUser>
  );
};

export default EditUserProfile;
