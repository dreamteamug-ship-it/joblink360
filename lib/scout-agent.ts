import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export async function runScoutAgent(targetUrl: string) {
  const isProd = process.env.NODE_ENV === 'production';
  const remotePath = 'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar';

  const browser = await puppeteer.launch({
    args: isProd ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: isProd 
      ? await chromium.executablePath(remotePath) 
      : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: isProd ? chromium.headless : true,
  });

  try {
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });
    const data = await page.title();
    console.log('Scout found:', data);
    return data;
  } finally {
    await browser.close();
  }
}
