// app/api/shop/scraper/route.ts
import { NextResponse } from 'next/server';
import { productScraper } from '@/lib/shop/scrapers/product-scraper';
import { aiAgents } from '@/lib/shop/ai-agents';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const limit = parseInt(searchParams.get('limit') || '50');
  
  try {
    // Trigger AI agents for scraping
    const result = await aiAgents.executeAgent('product-scraper', { category, limit });
    
    return NextResponse.json({
      success: true,
      products: result.products,
      count: result.productsScraped,
      message: result.message
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { category, limit = 100 } = await request.json();
    
    // Run complete scraping and enhancement pipeline
    const scraped = await productScraper.scrapeProducts(category, limit);
    
    // Trigger quality enhancement
    const enhanced = await aiAgents.executeAgent('quality-enhancer', { products: scraped });
    
    // Optimize pricing
    const priced = await aiAgents.executeAgent('pricing-optimizer', { products: enhanced.enhanced });
    
    return NextResponse.json({
      success: true,
      products: priced,
      count: priced.length,
      message: `Scraped, enhanced, and priced ${priced.length} luxury products`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
