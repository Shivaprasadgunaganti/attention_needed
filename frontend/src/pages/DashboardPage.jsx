import StatsCard from "../components/common/StatsCard";
import OpportunityTable from "../components/common/OpportunityTable";

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

      // const formatted = data.map((job) => ({
      //   id: job.id,
      //   title: job.title,
      //   company: job.company,
      //   matchScore: "--",
      //   experience: "--",
      //   easyApply: job.easy_apply,
      //   postedMinutesAgo: "--",
      //   priority: "HIGH",
      //   status: job.status,
      // }));

      const formatted = data.map((job) => ({
  id: job.id,
  title: job.title,
  company: job.company,
  matchScore: "--",
  experience: "--",
  easyApply: job.easy_apply,

  postedMinutesAgo: Math.floor(
    (new Date() - new Date(job.created_at)) / 60000
  ),

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
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <StatsCard
            title="Immediate Opportunities"
            value={opportunities.length}
          />
        </div>

        <div className="col-md-3">
          <StatsCard title="High Match Opportunities" value="12" />
        </div>

        <div className="col-md-3">
          <StatsCard title="Applications This Week" value="5" />
        </div>

        <div className="col-md-3">
          <StatsCard title="Top Missing Skill" value="TypeScript" />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">🔥 Immediate Attention</h4>

          <OpportunityTable opportunities={opportunities} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
