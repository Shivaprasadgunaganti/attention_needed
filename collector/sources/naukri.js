
// const { chromium } = require("playwright");

// async function collectNaukriJobs() {
//   const browser = await chromium.launch({
//     headless: false,
//   });

//   const page = await browser.newPage();

//   await page.goto(
//     "https://www.naukri.com/react-developer-jobs-in-hyderabad-secunderabad?k=react%20developer&l=hyderabad%20secunderabad&nignbevent_src=jobsearchDeskGNB&experience=1&functionAreaIdGid=5&functionAreaIdGid=8&cityTypeGid=17&ugTypeGid=12",
//     {
//       waitUntil: "domcontentloaded",
//     }
//   );

//   // await page.waitForTimeout(5000);

//   await page.waitForSelector(
//   ".srp-jobtuple-wrapper",
//   { timeout: 15000 }
// );

// await page.waitForTimeout(3000);

// const count = await page.locator(
//   ".srp-jobtuple-wrapper"
// ).count();

// console.log("Cards Visible:", count);

//   const jobs = await page.evaluate(() => {
//     const cards = document.querySelectorAll(
//       ".srp-jobtuple-wrapper"
//     );

//     return [...cards]
//       .slice(0, 20)
//       .map((card) => {
//         const title =
//           card.querySelector(".title")
//             ?.innerText
//             ?.trim() || "";

//         const company =
//           card.querySelector(".comp-name")
//             ?.innerText
//             ?.trim() || "";

//         const location =
//           card.querySelector(".locWdth")
//             ?.innerText
//             ?.trim() || "";

//         const experience =
//           card.querySelector(".expwdth")
//             ?.innerText
//             ?.trim() || "";

//         const posted =
//           card.querySelector(".job-post-day")
//             ?.innerText
//             ?.trim() || "";

//         const url =
//           card.querySelector(".title")
//             ?.href || "";

//         return {
//           title,
//           company,
//           location,
//           experience,
//           posted,
//           url,
//         };
//       });
//   });

//   console.log("Extracted Jobs:", jobs.length);

//   const freshJobs = jobs.filter((job) => {
//     const posted = job.posted.toLowerCase();

//     return (
//       posted.includes("today") ||
//       posted.includes("yesterday") ||
//       posted.includes("day ago") ||
//       posted.includes("days ago") ||
//       posted.includes("1 week ago")
//     );
//   });

//   console.log("Fresh Jobs:", freshJobs.length);

//   const relevantJobs = freshJobs.filter((job) => {
//     const title = job.title.toLowerCase();

//     return (
//       title.includes("react") ||
//       title.includes("frontend") ||
//       title.includes("front end") ||
//       title.includes("javascript") ||
//       title.includes("mern") ||
//       title.includes("full stack")
//     );
//   });

//   console.log(
//     "Relevant Jobs:",
//     relevantJobs.length
//   );

//   console.log(
//     JSON.stringify(relevantJobs, null, 2)
//   );

//   await browser.close();

//   return relevantJobs;
// }

// module.exports = collectNaukriJobs;


// production 

const { chromium } = require("playwright");

async function collectNaukriJobs() {
  const browser = await chromium.launch({
    // headless: false,
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.naukri.com/react-developer-jobs-in-hyderabad-secunderabad?k=react%20developer&l=hyderabad%20secunderabad&nignbevent_src=jobsearchDeskGNB&experience=1&functionAreaIdGid=5&functionAreaIdGid=8&cityTypeGid=17&ugTypeGid=12",
    {
      waitUntil: "networkidle",
      timeout: 60000,
    }
  );

  console.log("Final URL:", page.url());

  console.log("Page Title:", await page.title());

  await page.waitForTimeout(5000);

  const visibleCards = await page
    .locator(".srp-jobtuple-wrapper")
    .count();

  console.log("Cards Visible Before Scroll:", visibleCards);

  await page.mouse.wheel(0, 3000);

  await page.waitForTimeout(3000);

  const visibleCardsAfterScroll = await page
    .locator(".srp-jobtuple-wrapper")
    .count();

  console.log(
    "Cards Visible After Scroll:",
    visibleCardsAfterScroll
  );

  const jobs = await page.evaluate(() => {
    const cards =
      document.querySelectorAll(
        ".srp-jobtuple-wrapper"
      );

    return [...cards]
      .slice(0, 20)
      .map((card) => {
        const title =
          card.querySelector(".title")
            ?.innerText
            ?.trim() || "";

        const company =
          card.querySelector(".comp-name")
            ?.innerText
            ?.trim() || "";

        const location =
          card.querySelector(".locWdth")
            ?.innerText
            ?.trim() || "";

        const experience =
          card.querySelector(".expwdth")
            ?.innerText
            ?.trim() || "";

        const posted =
          card.querySelector(".job-post-day")
            ?.innerText
            ?.trim() || "";

        const url =
          card.querySelector(".title")
            ?.href || "";

        // return {
        //   title,
        //   company,
        //   location,
        //   experience,
        //   posted,
        //   url,
        // };
      
      return {
  source: "naukri",
  title,
  company,
  location,
  experience,
  posted,
  url,
};
      });
  });

  console.log("Extracted Jobs:", jobs.length);

  await browser.close();

  return jobs;
}

module.exports = collectNaukriJobs;