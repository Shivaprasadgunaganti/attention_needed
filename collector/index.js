const collectIndeedJobs = require("./sources/indeed");
const supabase = require("./services/supabase");

async function run() {
  const jobs = await collectIndeedJobs();

  console.log("Jobs Found:", jobs.length);

  console.log(jobs);

  // const opportunities = jobs.map((job) => ({
  //   source: "indeed",
  //   title: job.title,
  //   company: job.company,
  //   location: job.location,
  //   salary: null,
  //   easy_apply: job.easyApply,
  //   job_url: job.url,
  //   freshness_bucket: "24H",
  // }));


  const opportunities = jobs.map((job) => {
  const jobKey = job.url?.match(/jk=([^&]+)/)?.[1] || null;

  return {
    source: "indeed",
    title: job.title,
    company: job.company,
    location: job.location,
    salary: null,
    easy_apply: job.easyApply,
    job_url: job.url,
    job_key: jobKey,
    freshness_bucket: "24H",
  };
});

  console.log("Opportunities:");
  console.log(opportunities);

  const { error } = await supabase
    .from("opportunities")
    .upsert(opportunities, {
      // onConflict: "job_url",
      onConflict: "job_key",
    });

  if (error) {
    console.error(error);
    return;
  }

  console.log("Jobs stored successfully");
}

run();