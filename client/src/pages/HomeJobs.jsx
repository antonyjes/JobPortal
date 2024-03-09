import { useEffect, useState } from "react";
import LayoutHome from "./LayoutHome";

const HomeJobs = () => {
  const [jobs, setJobs] = useState(null);

  const getPublicJobs = async () => {
    const response = await fetch("http://localhost:3003/jobs/public", {
      method: "GET",
    });

    const data = await response.json();
    setJobs(data);
  };

  useEffect(() => {
    getPublicJobs();
  }, []);

  return (
    <LayoutHome>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] gap-4">
          {jobs &&
            jobs.map((job) => (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg"
                key={job._id}
              >
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{job.title}</div>
                  <h3>{job.location}</h3>
                  <h3>{job.category}</h3>
                  <h3>{job.jobType}</h3>
                </div>
                <div className="px-6 pt-4 pb-2">
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
              </div>
            ))}
        </div>
      </section>
    </LayoutHome>
  );
};

export default HomeJobs;
