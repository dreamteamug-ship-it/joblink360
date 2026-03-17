import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export async function runScoutAgent(targetUrl: string) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });
  const jobs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.job-card')).map(el => ({
      title: el.querySelector('.title')?.textContent,
      company: 'Extracted by Scout-1',
    }));
  });
  await browser.close();
  return jobs;
}
