// // DashboardPage.jsx

// const DashboardPage = () => {
//   return <h1>Dashboard</h1>;
// };

// export default DashboardPage;



import StatsCard from "../components/common/StatsCard";
import OpportunityTable from "../components/common/OpportunityTable";

// import { mockOpportunities } from "../data/mockOpportunities";

import { useEffect, useState } from "react";
import { getOpportunities } from "../services/opportunityService";

const DashboardPage = () => {
  const [opportunities, setOpportunities] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadOpportunities();
}, []);

const loadOpportunities = async () => {
  try {
    const data = await getOpportunities();

    const formatted = data.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      matchScore: "--",
      experience: "--",
      easyApply: job.easy_apply,
      postedMinutesAgo: "--",
      priority: "HIGH",
      status: job.status,
    }));

    setOpportunities(formatted);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>

      <h2 className="mb-4">
        Dashboard
      </h2>

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          {/* <StatsCard
            title="Immediate Opportunities"
            value="3"
          /> */}
          <StatsCard
  title="Immediate Opportunities"
  value={opportunities.length}
/>
        </div>

        <div className="col-md-3">
          <StatsCard
            title="High Match Opportunities"
            value="12"
          />
        </div>

        <div className="col-md-3">
          <StatsCard
            title="Applications This Week"
            value="5"
          />
        </div>

        <div className="col-md-3">
          <StatsCard
            title="Top Missing Skill"
            value="TypeScript"
          />
        </div>

      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          <h4 className="mb-3">
            🔥 Immediate Attention
          </h4>

          {/* <OpportunityTable
            opportunities={mockOpportunities}
          /> */}
          <OpportunityTable
  opportunities={opportunities}
/>

        </div>
      </div>

    </div>
  );
};

export default DashboardPage;