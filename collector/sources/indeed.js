const { chromium } = require("playwright");

async function collectIndeedJobs() {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://in.indeed.com/jobs?q=React+Developer&l=Hyderabad&fromage=1&radius=25"
    // "https://in.indeed.com/react-developer-jobs"
    , {
    waitUntil: "domcontentloaded",
  });

  await page.waitForTimeout(5000);

  const jobs = await page.evaluate(() => {
    const cards = document.querySelectorAll(".job_seen_beacon");

    return [...cards].slice(0, 20).map((card) => {
      const title =
        card.querySelector(".jobTitle span")?.innerText?.trim() || "";

      const company =
        card.querySelector('[data-testid="company-name"]')
          ?.innerText?.trim() || "";

      const location =
        card.querySelector('[data-testid="text-location"]')
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

  await browser.close();

  return jobs;
}

module.exports = collectIndeedJobs;