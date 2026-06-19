const collectIndeedJobs = require("./sources/indeed");
const supabase = require("./services/supabase");

async function run() {
  const jobs = await collectIndeedJobs();

  console.log("Jobs Found:", jobs.length);

  console.log(jobs);

  const opportunities = jobs.map((job) => ({
    source: "indeed",
    title: job.title,
    company: job.company,
    location: job.location,
    salary: null,
    easy_apply: job.easyApply,
    job_url: job.url,
    freshness_bucket: "24H",
  }));

  const { error } = await supabase
    .from("opportunities")
    .upsert(opportunities, {
      onConflict: "job_url",
    });

  if (error) {
    console.error(error);
    return;
  }

  console.log("Jobs stored successfully");
}

run();