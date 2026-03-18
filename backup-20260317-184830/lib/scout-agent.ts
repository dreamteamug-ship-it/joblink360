import puppeteer from 'puppeteer-core';

export async function runScoutAgent(targetUrl: string) {
  const isProd = process.env.NODE_ENV === 'production';
  let browser;

  try {
    if (isProd) {
      // Production: Use the minimized chromium with remote binary
      const chromium = (await import('@sparticuz/chromium-min')).default;
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'),
        headless: true, // Hardcoded for production serverless
      });
    } else {
      // Development: Local Chrome
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true,
      });
    }

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    const title = await page.title();
    const content = await page.evaluate(() => document.body.innerText.substring(0, 5000));

    return { title, content };
  } finally {
    if (browser) await browser.close();
  }
}
