// const { chromium } = require("playwright");

// (async () => {
//   const browser = await chromium.launch({
//     headless: false,
//   });

//   const page = await browser.newPage();

//   await page.goto("https://www.naukri.com", {
//     waitUntil: "domcontentloaded",
//   });

//   console.log("Naukri Opened");

//   await page.waitForTimeout(10000);

//   const currentUrl = page.url();

//   console.log("Current URL:", currentUrl);

//   await browser.close();
// })();



const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.naukri.com/react-developer-jobs",
    {
      waitUntil: "domcontentloaded",
    }
  );

  await page.waitForTimeout(10000);

  console.log("Current URL:", page.url());

  await browser.close();
})();