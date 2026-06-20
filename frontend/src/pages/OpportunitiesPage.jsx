// // DashboardPage.jsx

// const OpportunitiesPage = () => {
//   return <h1>OpportunitiesPage</h1>;
// };

// export default OpportunitiesPage;


// first modiffication
// import { useEffect, useState } from "react";
// import { getAllOpportunities } from "../services/opportunityService";

// const OpportunitiesPage = () => {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     loadJobs();
//   }, []);

//   const loadJobs = async () => {
//     const data = await getAllOpportunities();
//     setJobs(data);
//   };

//   return (
//     <div>
//       <h2 className="mb-4">
//         Opportunities
//       </h2>

//       <div className="card shadow-sm">
//         <div className="card-body">

//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Role</th>
//                 <th>Company</th>
//                 <th>Location</th>
//                 <th>Easy Apply</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {jobs.map((job) => (
//                 <tr key={job.id}>
//                   <td>{job.title}</td>
//                   <td>{job.company}</td>
//                   <td>{job.location}</td>
//                   <td>
//                     {job.easy_apply ? "Yes" : "No"}
//                   </td>
//                   <td>{job.status}</td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default OpportunitiesPage;

//next modification

import { useEffect, useState } from "react";
import { getAllOpportunities } from "../services/opportunityService";

const OpportunitiesPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getAllOpportunities();
      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading opportunities...</p>;
  }

  return (
    <div>
      <h2 className="mb-4">
        Opportunities
      </h2>

      <div className="card shadow-sm">
        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>
                <tr>
                  <th>Role</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Easy Apply</th>
                  <th>Source</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>

                    <td>
                      {job.easy_apply ? "Yes" : "No"}
                    </td>

                    <td>{job.source}</td>

                    <td>
                      <a
                        href={job.job_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;
