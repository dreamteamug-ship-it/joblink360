// lib/scraping/scraper-service.ts
import { chromium } from "playwright";
import { JSDOM } from "jsdom";

export interface ScrapedItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  region: string;
  postedDate: string;
  deadline?: string;
  amount?: string;
  category: string;
  countryCode?: string;
  requirements?: string[];
  processed: boolean;
  matched: boolean;
  timestamp: string;
}

export class ScraperService {
  private browser: any = null;

  async initialize() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });
    }
  }

  async scrapeJobs(source: any): Promise<ScrapedItem[]> {
    try {
      await this.initialize();
      const context = await this.browser.newContext();
      const page = await context.newPage();
      
      await page.goto(source.url, { waitUntil: "networkidle" });
      
      // Wait for content to load
      await page.waitForTimeout(3000);
      
      // Extract job listings (this would be customized per source)
      const jobs = await page.evaluate(() => {
        const items: any[] = [];
        // This is a simplified example - real implementation would vary by source
        const jobElements = document.querySelectorAll(".job-item, .vacancy, .position");
        jobElements.forEach(el => {
          try {
            items.push({
              title: el.querySelector("h2, h3, .title")?.textContent?.trim() || "Unknown Position",
              description: el.querySelector(".description, .summary")?.textContent?.trim() || "",
              url: el.querySelector("a")?.href || window.location.href,
              source: window.location.hostname,
              postedDate: new Date().toISOString(),
              category: "International Job"
            });
          } catch (e) {
            console.log("Error parsing job item:", e);
          }
        });
        return items;
      });

      await context.close();
      
      // Transform to our standard format
      return jobs.map((job, index) => ({
        id: `${source.name}-${Date.now()}-${index}`,
        title: job.title,
        description: job.description,
        url: job.url,
        source: source.name,
        region: source.region,
        postedDate: job.postedDate,
        category: "Job",
        processed: false,
        matched: false,
        timestamp: new Date().toISOString()
      }));

    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
      return [];
    }
  }

  async scrapeTenders(source: any): Promise<ScrapedItem[]> {
    try {
      await this.initialize();
      const context = await this.browser.newContext();
      const page = await context.newPage();
      
      await page.goto(source.url, { waitUntil: "networkidle" });
      await page.waitForTimeout(3000);
      
      const tenders = await page.evaluate(() => {
        const items: any[] = [];
        const tenderElements = document.querySelectorAll(".tender-item, .contract, .opportunity");
        tenderElements.forEach(el => {
          try {
            items.push({
              title: el.querySelector("h2, h3, .title")?.textContent?.trim() || "Unknown Tender",
              description: el.querySelector(".description, .summary")?.textContent?.trim() || "",
              url: el.querySelector("a")?.href || window.location.href,
              deadline: el.querySelector(".deadline, .closing")?.textContent?.trim(),
              amount: el.querySelector(".amount, .value")?.textContent?.trim(),
              source: window.location.hostname,
              postedDate: new Date().toISOString()
            });
          } catch (e) {
            console.log("Error parsing tender item:", e);
          }
        });
        return items;
      });

      await context.close();
      
      return tenders.map((tender, index) => ({
        id: `${source.name}-${Date.now()}-${index}`,
        title: tender.title,
        description: tender.description,
        url: tender.url,
        source: source.name,
        region: source.region,
        postedDate: tender.postedDate,
        deadline: tender.deadline,
        amount: tender.amount,
        category: "Tender",
        processed: false,
        matched: false,
        timestamp: new Date().toISOString()
      }));

    } catch (error) {
      console.error(`Error scraping tenders from ${source.name}:`, error);
      return [];
    }
  }

  async scrapeFunding(source: any): Promise<ScrapedItem[]> {
    try {
      await this.initialize();
      const context = await this.browser.newContext();
      const page = await context.newPage();
      
      await page.goto(source.url, { waitUntil: "networkidle" });
      await page.waitForTimeout(3000);
      
      const funds = await page.evaluate(() => {
        const items: any[] = [];
        const fundElements = document.querySelectorAll(".grant-item, .funding, .opportunity");
        fundElements.forEach(el => {
          try {
            items.push({
              title: el.querySelector("h2, h3, .title")?.textContent?.trim() || "Unknown Funding Opportunity",
              description: el.querySelector(".description, .summary")?.textContent?.trim() || "",
              url: el.querySelector("a")?.href || window.location.href,
              deadline: el.querySelector(".deadline, .closing")?.textContent?.trim(),
              amount: el.querySelector(".amount, .value, .budget")?.textContent?.trim(),
              source: window.location.hostname,
              postedDate: new Date().toISOString()
            });
          } catch (e) {
            console.log("Error parsing funding item:", e);
          }
        });
        return items;
      });

      await context.close();
      
      return funds.map((fund, index) => ({
        id: `${source.name}-${Date.now()}-${index}`,
        title: fund.title,
        description: fund.description,
        url: fund.url,
        source: source.name,
        region: source.region,
        postedDate: fund.postedDate,
        deadline: fund.deadline,
        amount: fund.amount,
        category: "Funding",
        processed: false,
        matched: false,
        timestamp: new Date().toISOString()
      }));

    } catch (error) {
      console.error(`Error scraping funding from ${source.name}:`, error);
      return [];
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export const scraperService = new ScraperService();
