// app/api/jobs/indeed/route.ts
import { ApifyClient } from 'apify-client';

export async function GET(req: Request) {
  const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
  
  const input = {
    "searchTerms": ["software developer"],
    "location": "Kenya",
    "maxResults": 20
  };
  
  const run = await client.actor("voyager/indeed-scraper").call(input);
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  
  return NextResponse.json({ jobs: items });
}