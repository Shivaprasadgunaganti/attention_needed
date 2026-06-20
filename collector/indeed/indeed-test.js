// const { chromium } = require("playwright");

// (async () => {
//   const browser = await chromium.launch({
//     headless: false,
//   });

//   const page = await browser.newPage();

//   await page.goto("https://in.indeed.com");

//   await page.waitForLoadState("networkidle");

//   await page
//     .locator('input[name="q"]')
//     .fill("React Developer");

//   await page
//     .locator('input[name="l"]')
//     .fill("Hyderabad");

//   await page
//     .getByRole("button", { name: /find jobs/i })
//     .click();

//   await page.waitForLoadState("networkidle");

//   console.log("Search Results Loaded");

//   await page.waitForTimeout(10000);

//   await browser.close();
// })();

// const { chromium } = require("playwright");

// (async () => {
//   const browser = await chromium.launch({
//     headless: false,
//   });

//   const page = await browser.newPage();

//   await page.goto(
//     "https://in.indeed.com/react-developer-jobs",
//     {
//       waitUntil: "domcontentloaded",
//     }
//   );

//   await page.waitForTimeout(10000);

//   console.log("Current URL:", page.url());

//   await browser.close();
// })();



// working
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    // headless: false,
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("https://in.indeed.com/react-developer-jobs", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForTimeout(5000);

  const jobs = await page.evaluate(() => {
    const cards = document.querySelectorAll(".job_seen_beacon");

    return [...cards].slice(0, 5).map((card) => {
      const title =
        card.querySelector(".jobTitle span")?.innerText?.trim() || "";

      const company =
        card.querySelector('[data-testid="company-name"]')?.innerText?.trim() ||
        "";

      const location =
        card
          .querySelector('[data-testid="text-location"]')
          ?.innerText?.trim() || "";

      const easyApply = card.innerText.includes("Easily apply");

      const link =
  card.querySelector(".jobTitle a")
    ?.getAttribute("href") || "";

const url = link
  ? `https://in.indeed.com${link}`
  : ""; 

      return {
        title,
        company,
        location,
        easyApply,
        url,
      };
    });
  });

// const jobs = await page.evaluate(() => {
//   const card = document.querySelector(".job_seen_beacon");

//   return card ? card.innerText : "No card found";
// });

// console.log(jobs);

  console.log(JSON.stringify(jobs, null, 2));

  await page.waitForTimeout(5000);

  await browser.close();
})();


