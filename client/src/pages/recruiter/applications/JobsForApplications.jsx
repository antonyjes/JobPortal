import { setJobs } from "@/state";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutRecruiter from "../LayoutRecruiter";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const JobsForApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector((state) => state.jobs);
  const token = useSelector((state) => state.token);
  const [currentPage, setCurrentPage] = useState(0);

  const getJobs = async () => {
    const response = await fetch("http://localhost:3003/jobs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setJobs({ jobs: data }));
  };

  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(jobs.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <LayoutRecruiter>
      <div className="space-y-4 p-8 pt-6">
        <Heading
          title="Jobs for applications"
          description="Choose a job to see the applicants"
        />
        <Separator />
        <section className="space-y-6 pb-4 pt-3 md:pb-6 md:pt-5 lg:py-16">
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobs && jobs.length > 0 ? (
              jobs.slice(offset, offset + PER_PAGE).map((job) => (
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg"
                  key={job._id}
                >
                  <div className="px-6 py-2">
                    <div className="font-bold text-xl mb-2">{job.title}</div>
                    <h3>{job.location}</h3>
                    <h3>{job.category}</h3>
                    <h3>{job.jobType}</h3>
                  </div>
                  <div className="px-6 pt-2 pb-2">
                    {job.requirements?.length >= 1 &&
                      job.requirements.map((requirement) => (
                        <span
                          key={requirement}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {requirement}
                        </span>
                      ))}
                  </div>
                  <div className="flex w-full justify-end m-0">
                    <Button
                      className="mb-2 mr-2"
                      onClick={() =>
                        navigate(`/recruiter/applications/${job._id}`)
                      }
                    >
                      See applicants
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>
        </section>
      </div>
    </LayoutRecruiter>
  );
};

export default JobsForApplications;
