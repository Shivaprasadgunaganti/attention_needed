const OpportunityTable = ({ opportunities }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">

        <thead>
          <tr>
            <th>Priority</th>
            <th>Role</th>
            <th>Match</th>
            <th>Posted</th>
            <th>Company</th>
            <th>Experience</th>
            <th>Easy Apply</th>
          </tr>
        </thead>

        <tbody>
          {opportunities.map((job) => (
            <tr key={job.id}>
              <td>{job.priority}</td>
              <td>{job.title}</td>
              <td>{job.matchScore}%</td>
              <td>{job.postedMinutesAgo} mins</td>
              <td>{job.company}</td>
              <td>{job.experience}</td>
              <td>
                {job.easyApply ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default OpportunityTable;