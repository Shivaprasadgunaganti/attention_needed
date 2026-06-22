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

  //   const opportunities = jobs.map((job) => {
  //   const jobKey = job.url?.match(/jk=([^&]+)/)?.[1] || null;

  //   return {
  //     source: "indeed",
  //     title: job.title,
  //     company: job.company,
  //     location: job.location,
  //     salary: null,
  //     easy_apply: job.easyApply,
  //     job_url: job.url,
  //     job_key: jobKey,
  //     freshness_bucket: "24H",
  //   };
  // });

  // const opportunities = jobs.map((job) => {
  //   const jobKey = job.url?.match(/jk=([^&]+)/)?.[1] || null;

  //   const title = job.title.toLowerCase();

  //   let score = 50;

  //   if (title.includes("react developer")) {
  //     score = 100;
  //   } else if (title.includes("frontend")) {
  //     score = 95;
  //   } else if (title.includes("javascript")) {
  //     score = 90;
  //   } else if (title.includes("mern")) {
  //     score = 85;
  //   } else if (title.includes("full stack") && title.includes("react")) {
  //     score = 80;
  //   } else if (title.includes(".net") || title.includes("dotnet")) {
  //     score = 60;
  //   } else if (title.includes("java") && title.includes("react")) {
  //     score = 50;
  //   }

  //   if (
  //     title.includes("senior") ||
  //     title.includes("lead") ||
  //     title.includes("architect") ||
  //     title.includes("manager")
  //   ) {
  //     score -= 30;
  //   }

  //   const isRemote =
  //     job.location?.toLowerCase().includes("remote") ||
  //     job.location?.toLowerCase().includes("work from home") ||
  //     job.location?.toLowerCase().includes("hybrid");

  //   return {
  //     source: "indeed",
  //     title: job.title,
  //     company: job.company,
  //     location: job.location,
  //     salary: null,
  //     easy_apply: job.easyApply,
  //     job_url: job.url,
  //     job_key: jobKey,
  //     freshness_bucket: "24H",

  //     score,
  //     match_percentage: score,
  //     is_remote: isRemote,
  //   };
  // });

  const opportunities = jobs.map((job) => {
  const jobKey = job.url?.match(/jk=([^&]+)/)?.[1] || null;

  const title = job.title.toLowerCase();

  let score = 0;

  // Priority Roles

  if (title.includes("react developer")) {
    score = 100;
  }

  else if (
    title.includes("frontend") ||
    title.includes("front end")
  ) {
    score = 95;
  }

  else if (title.includes("javascript")) {
    score = 90;
  }

  else if (title.includes("mern")) {
    score = 85;
  }

  else if (
    title.includes("full stack") &&
    title.includes("react")
  ) {
    score = 80;
  }

  else if (
    title.includes(".net") ||
    title.includes("dotnet")
  ) {
    score = 60;
  }

  else if (
    title.includes("java") &&
    title.includes("react")
  ) {
    score = 50;
  }

  // Senior Penalty

  if (
    title.includes("senior") ||
    title.includes("lead") ||
    title.includes("principal") ||
    title.includes("architect")
  ) {
    score = Math.max(score - 30, 0);
  }

  const isRemote =
    job.location?.toLowerCase().includes("remote") || false;

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

    score,
    match_percentage: score,
    is_remote: isRemote,
  };
});

  console.log("Opportunities:");
  console.log(opportunities);

  const { error } = await supabase.from("opportunities").upsert(opportunities, {
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
