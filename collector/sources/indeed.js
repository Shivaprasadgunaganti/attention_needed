const { chromium } = require("playwright");

async function collectIndeedJobs() {
  // const browser = await chromium.launch({
  //   headless: false,
  const browser = await chromium.launch({
    headless: true,
  });

  // const page = await browser.newPage();

  const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  viewport: {
    width: 1366,
    height: 768,
  },
  locale: "en-US",
  timezoneId: "Asia/Kolkata",
});

const page = await context.newPage();

await page.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", {
    get: () => undefined,
  });
});

  await page.goto(
    "https://in.indeed.com/jobs?q=React+Developer&l=Hyderabad&fromage=1&radius=25",
    // "https://in.indeed.com/react-developer-jobs"
    {
      waitUntil: "domcontentloaded",
    },
  );

  await page.waitForTimeout(5000);

  console.log("Page Title:", await page.title());

  const content = await page.content();
  console.log("Page Length:", content.length);

  await page.screenshot({
    path: "debug.png",
  });

  console.log("Screenshot saved");

  const jobs = await page.evaluate(() => {
    const cards = document.querySelectorAll(".job_seen_beacon");

    return [...cards].slice(0, 20).map((card) => {
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
        card.querySelector(".jobTitle a")?.getAttribute("href") || "";

      const url = link ? `https://in.indeed.com${link}` : "";

      // return {
      //   title,
      //   company,
      //   location,
      //   easyApply,
      //   url,
      // };
return {
  source: "indeed",
  title,
  company,
  location,
  easyApply,
  url,
};
    });
  });

  await browser.close();

  console.log("Jobs Found:", jobs.length);

jobs.forEach((job, index) => {
  console.log(index + 1, job.title);
});

  return jobs;
}

module.exports = collectIndeedJobs;
