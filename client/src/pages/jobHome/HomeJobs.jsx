import { useEffect, useState } from "react";
import LayoutHome from "../LayoutHome";
import ReactPaginate from "react-paginate";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const getPublicJobs = async () => {
    const response = await fetch("http://localhost:3003/jobs/public", {
      method: "GET",
    });

    const data = await response.json();
    setJobs(data);
  };

  const PER_PAGE = 9;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(jobs.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getPublicJobs();
  }, []);

  return (
    <LayoutHome>
      <section className="space-y-6 pb-4 pt-3 md:pb-6 md:pt-5 lg:py-16">
        <div className="container flex max-w-[64rem] gap-4">
          {jobs &&
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
                  {job.requirements.length >= 1 &&
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
                    onClick={() => navigate(`/jobs/${job._id}`)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
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
    </LayoutHome>
  );
};

export default HomeJobs;
