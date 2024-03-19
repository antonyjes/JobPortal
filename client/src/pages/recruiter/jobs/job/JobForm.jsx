import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const JobForm = ({ jobData, setJobData }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const recruiterId = useSelector((state) => state.user._id);
  const [title, setTitle] = useState(jobData?.title || "");
  const [description, setDescription] = useState(jobData?.description || "");
  const [location, setLocation] = useState(jobData?.location || "");
  const [category, setCategory] = useState(jobData?.category || "");
  const [requirements, setRequirements] = useState(jobData?.requirements || []);
  const [requirement, setRequirement] = useState("");
  const [jobType, setJobType] = useState(jobData?.jobType || "");
  const [status, setStatus] = useState(jobData?.status || "");
  const [salary, setSalary] = useState(jobData?.salary || 0);
  const action = jobData ? "Edit" : "Create";

  const handleDeleteRequirement = (index) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };

  const handleAddRequirement = () => {
    if (requirement.trim() !== "" && requirements.length < 3) {
      setRequirements([...requirements, requirement]);
      setRequirement("");
    }
  };

  const handleChangeEditor = (value) => {
    setDescription(value);
  };

  const createJob = async () => {
    const savedJobResponse = await fetch("http://localhost:3003/jobs/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        location: location,
        category: category,
        requirements: requirements,
        jobType: jobType,
        status: status,
        salary: salary,
        recruiterId: recruiterId,
      }),
    });

    const savedJob = await savedJobResponse.json();

    if (savedJob) {
      toast.success("Job created!");
      navigate("/recruiter/jobs");
    }
  };

  const editJob = async () => {
    const updatedJobResponse = await fetch(
      `http://localhost:3003/jobs/${jobData?._id}/edit`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          location: location,
          category: category,
          requirements: requirements,
          jobType: jobType,
          status: status,
          salary: salary,
          recruiterId: recruiterId,
        }),
      }
    );

    const updatedJob = await updatedJobResponse.json();

    if (updatedJob) {
      setJobData(updatedJob);
      toast.success("Job updated!");
      navigate("/recruiter/jobs");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "Create") await createJob();
    if (action === "Edit") await editJob();
  };

  return (
    <div className="min-h-[80vh]">
      <div className="container grid h-[80vh] w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="lg:p-1">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[700px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {action} a job
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the job data below to {action.toLowerCase()} it
              </p>
            </div>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-1 mb-4">
                  <Label>Title</Label>
                  <Input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div className="grid gap-1 mb-4">
                  <Label>Description</Label>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={handleChangeEditor}
                    className="h-[15rem]"
                  />
                </div>
                <div className="grid gap-2 grid-cols-3 mb-4 mt-[3.5rem]">
                  <div className="grid gap-1">
                    <Label>Location</Label>
                    <Input
                      type="text"
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>Category</Label>
                    <Input
                      type="text"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label>Job Type</Label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="h-10 rounded-md border border-input text-sm"
                    >
                      <option value="">Select the job type:</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-1 mb-4">
                  <Label>Requirements <span>(máximo 3)</span></Label>
                  <div className="flex flex-row gap-2">
                    {requirements.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-1 rounded-md bg-sky-300 p-1"
                      >
                        <p className="font-sans">{item}</p>
                        <button onClick={() => handleDeleteRequirement(index)}>
                          <X className="w-[1rem]" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2">
                    <Input
                      type="text"
                      onChange={(e) => setRequirement(e.target.value)}
                      value={requirement}
                    />
                    <Button type="button" onClick={handleAddRequirement}>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2 grid-cols-2 mb-4">
                  <div className="grid gap-1">
                    <Label>Status</Label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="h-10 rounded-md border border-input text-sm"
                    >
                      <option value="">Select the status:</option>
                      <option value="Open">Open</option>
                      <option value="Interviews">Interviews</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  <div className="grid gap-1">
                    <Label>Salary</Label>
                    <Input
                      type="number"
                      onChange={(e) => setSalary(e.target.value)}
                      value={salary}
                    />
                  </div>
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
  );
};

export default JobForm;
