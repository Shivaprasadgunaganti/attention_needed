// const collectIndeedJobs = require("./sources/indeed");
// const collectNaukriJobs = require("./sources/naukri");
// const supabase = require("./services/supabase");

// async function run() {
//   // const jobs = await collectIndeedJobs();
//   const indeedJobs = await collectIndeedJobs();
// const naukriJobs = await collectNaukriJobs();

// const jobs = [
//   ...indeedJobs,
//   ...naukriJobs,
// ];

// console.log(
//   "Indeed Jobs:",
//   indeedJobs.length
// );

// console.log(
//   "Naukri Jobs:",
//   naukriJobs.length
// );

// console.log(
//   "Total Jobs:",
//   jobs.length
// );

//   console.log("Jobs Found:", jobs.length);

//   console.log(jobs);

//   const opportunities = jobs.map((job) => {
//     // const jobKey = job.url?.match(/jk=([^&]+)/)?.[1] || null;

//     let jobKey = null;

// if (job.url?.includes("jk=")) {
//   jobKey =
//     job.url.match(/jk=([^&]+)/)?.[1];
// } else {
//   jobKey =
//     job.url?.split("-").pop();
// }

//     const title = job.title.toLowerCase();

//     let score = 0;

//     // Priority Roles

//     if (title.includes("react developer")) {
//       score = 100;
//     } else if (title.includes("frontend") || title.includes("front end")) {
//       score = 95;
//     } else if (title.includes("javascript")) {
//       score = 90;
//     } else if (title.includes("mern")) {
//       score = 85;
//     } else if (title.includes("full stack") && title.includes("react")) {
//       score = 80;
//     } else if (title.includes(".net") || title.includes("dotnet")) {
//       score = 60;
//     } else if (title.includes("java") && title.includes("react")) {
//       score = 50;
//     }

//     // Senior Penalty

//     if (
//       title.includes("senior") ||
//       title.includes("lead") ||
//       title.includes("principal") ||
//       title.includes("architect")
//     ) {
//       score = Math.max(score - 30, 0);
//     }

//     const isRemote = job.location?.toLowerCase().includes("remote") || false;

//     return {
//       // source: "indeed",
//       source: job.source,
//       title: job.title,
//       company: job.company,
//       location: job.location,
//       salary: null,
//       easy_apply: job.easyApply,
//       job_url: job.url,
//       job_key: jobKey,
//       freshness_bucket: "24H",

//       score,
//       match_percentage: score,
//       is_remote: isRemote,
//     };
//   });

//   console.log("Opportunities:");
//   console.log(opportunities);

//   const { error } = await supabase.from("opportunities").upsert(opportunities, {
//     // onConflict: "job_url",
//     onConflict: "job_key",
//   });

//   if (error) {
//     console.error(error);
//     return;
//   }

//   console.log("Jobs stored successfully");
// }

// run();




const collectIndeedJobs = require("./sources/indeed");
const collectNaukriJobs = require("./sources/naukri");
const supabase = require("./services/supabase");

async function run() {
  const indeedJobs = await collectIndeedJobs();
  const naukriJobs = await collectNaukriJobs();

  const jobs = [
    ...indeedJobs,
    ...naukriJobs,
  ];

  if (jobs.length === 0) {
  throw new Error(
    "Collector returned zero jobs"
  );
}

  console.log(
    "Indeed Jobs:",
    indeedJobs.length
  );

  console.log(
    "Naukri Jobs:",
    naukriJobs.length
  );

  console.log(
    "Total Jobs:",
    jobs.length
  );

  const opportunities = jobs.map((job) => {
    let jobKey = null;

    if (job.url?.includes("jk=")) {
      jobKey =
        job.url.match(/jk=([^&]+)/)?.[1];
    } else {
      jobKey =
        job.url?.split("-").pop();
    }

    const title =
      job.title?.toLowerCase() || "";

    let score = 0;

    // Priority Roles

    if (
      title.includes("react developer") ||
      title.includes("react js") ||
      title.includes("react.js")
    ) {
      score = 100;
    } else if (
      title.includes("frontend") ||
      title.includes("front end")
    ) {
      score = 95;
    } else if (
      title.includes("javascript") ||
      title.includes("java script")
    ) {
      score = 90;
    } else if (
      title.includes("mern")
    ) {
      score = 85;
    } else if (
      title.includes("full stack") &&
      (
        title.includes("react") ||
        title.includes("react js") ||
        title.includes("react.js")
      )
    ) {
      score = 80;
    } else if (
      title.includes(".net") ||
      title.includes("dotnet")
    ) {
      score = 60;
    } else if (
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
     
      score = Math.max(score - 50, 0);
    }

    const isRemote =
      job.location
        ?.toLowerCase()
        .includes("remote") || false;

    return {
      source: job.source,
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

  // Only keep relevant jobs
  const filteredOpportunities =
    opportunities.filter(
      (job) => job.score > 0
    );

  console.log(
    "Relevant Jobs:",
    filteredOpportunities.length
  );

  console.log(
    "Filtered Opportunities:"
  );

  console.log(
    filteredOpportunities
  );

  const { error } =
    await supabase
      .from("opportunities")
      .upsert(
        filteredOpportunities,
        {
          onConflict: "job_key",
        }
      );

  if (error) {
    console.error(error);
    return;
  }

  console.log(
    "Jobs stored successfully"
  );
}

// run().catch(console.error);
run().catch((err) => {
  console.error(err);
  process.exit(1);
});