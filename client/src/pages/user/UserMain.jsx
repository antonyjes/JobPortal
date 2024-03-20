import { Heading } from "@/components/heading";
import LayoutUser from "./LayoutUser";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setJobs } from "@/state";
import { Button } from "@/components/ui/button";
import ReactPaginate from "react-paginate";
import ModalUserJob from "./ModalUserJob";

const UserMain = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentUserJob, setCurrentUserJob] = useState([]);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const userJobs = useSelector((state) => state.jobs);

  const getApplicationJobs = async () => {
    const response = await fetch(
      `http://localhost:3003/applications/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setJobs({ jobs: data }));
  };

  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(userJobs.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getApplicationJobs();
  }, []);

  return (
    <>
      <LayoutUser>
        <div className="space-y-4 p-8 pt-6">
          <Heading title="Dashboard User" description="Overview your status" />
          <Separator />
          {/* STATUS OF JOB APPLIED BY */}
          <section className="space-y-6 pb-4 pt-3 md:pb-6 md:pt-5 lg:py-16">
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
              {userJobs &&
                userJobs.slice(offset, offset + PER_PAGE).map((userJob) => (
                  <div
                    key={userJob._id}
                    className="max-w-sm rounded overflow-hidden shadow-lg"
                  >
                    <div className="px-6 py-2">
                      <div className="font-bold text-xl mb-2">
                        {userJob.jobTitle.toUpperCase()}
                      </div>
                      <h3><span className="font-bold">Status: </span>{userJob.status}</h3>
                    </div>
                    <div className="flex w-full justify-end m-0">
                      <Button
                        className="mb-2 mr-2"
                        onClick={() => {
                          setCurrentUserJob(userJob);
                          setShowModal(true);
                        }}
                      >
                        See more
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
        </div>
      </LayoutUser>
      {showModal && (
        <ModalUserJob
            showModal={showModal}
            setShowModal={setShowModal}
            currentUserJob={currentUserJob}
        />
      )}
    </>
  );
};

export default UserMain;
