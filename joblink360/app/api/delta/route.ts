export const dynamic = 'force-dynamic'

// app/api/delta/route.ts
// Delta SMM Agent - Auto Social Media Marketing

import { NextResponse } from 'next/server';

// Content templates for different platforms
const contentTemplates = {
  whatsapp: [
    {
      title: "ðŸš€ Launch Alert!",
      body: "JobLink 360 is LIVE! Transform your career with AI.\n\nPay KES 5,000 via M-Pesa Paybill 400200, Account 4045731\nGet 90-day income plan + 50+ AI courses\n\nStart now: https://joblink360-gamma.vercel.app/pay",
      emoji: "ðŸš€"
    },
    {
      title: "ðŸ’° Earn in 90 Days",
      body: "The 3-Month Income Test is REAL!\n\nWeek 1: Complete AI Fundamentals\nWeek 2-3: Master high-income skill\nWeek 4-8: Apply to 50+ jobs daily\nWeek 9-12: Scale to $1,000/month\n\nPay KES 5,000 to start: https://joblink360-gamma.vercel.app/pay",
      emoji: "ðŸ’°"
    },
    {
      title: "ðŸŒ African Opportunities",
      body: "ðŸ‡°ðŸ‡ª Kenya: World Bank Digital Grant ($500K)\nðŸ‡³ðŸ‡¬ Nigeria: AfDB Digital Skills ($300K)\nðŸ‡¿ðŸ‡¦ South Africa: Mastercard Foundation ($1.5M)\n\nGet matched today! Pay KES 5,000: https://joblink360-gamma.vercel.app/pay",
      emoji: "ðŸŒ"
    }
  ],
  linkedin: [
    {
      title: "JobLink 360 Launches in Kenya!",
      body: "Africa's first AI-powered career platform is here. We're transforming learners into earners in 90 days.\n\nâœ… 50+ AI courses\nâœ… M-Pesa Paybill 400200\nâœ… 0.02s verification\nâœ… 26-country funding opportunities\n\nStart your journey: https://joblink360-gamma.vercel.app/pay",
      hashtags: "#AI #Career #Kenya #JobLink360"
    },
    {
      title: "The Future of Work is AI",
      body: "Kenyan youth: Your 90-day income plan starts today.\n\nðŸ“± M-Pesa Paybill: 400200\nðŸ“± Account: 4045731\nðŸ’° Amount: KES 5,000\n\nGet instant access to:\n- AI certification\n- Funding opportunities\n- 1-on-1 mentorship\n\nEnroll now: https://joblink360-gamma.vercel.app/pay",
      hashtags: "#ArtificialIntelligence #KenyanTech #CareerGrowth"
    }
  ],
  twitter: [
    {
      body: "ðŸš€ JobLink 360 is LIVE! Pay KES 5,000 via M-Pesa Paybill 400200, Account 4045731. Get 90-day income plan + AI courses. Start now: https://joblink360-gamma.vercel.app/pay #JobLink360 #AI #Kenya",
      hashtags: "#JobLink360 #AI #Kenya"
    },
    {
      body: "ðŸ’° The 3-Month Income Test is real! Pay KES 5,000 today â†’ Get personalized 90-day income plan â†’ Start earning in 90 days. M-Pesa: 400200, Account: 4045731. https://joblink360-gamma.vercel.app/pay",
      hashtags: "#Income #Kenya #Mpesa"
    }
  ],
  instagram: [
    {
      caption: "ðŸš€ JOBLINK 360 IS HERE! ðŸš€\n\nAfrica's first AI-powered career platform. Transform learners into earners in 90 days.\n\nðŸ“± M-Pesa Paybill: 400200\nðŸ“± Account: 4045731\nðŸ’° Amount: KES 5,000\n\nLink in bio to start! ðŸ”—",
      hashtags: "#JobLink360 #AI #Kenya #Career #Mpesa"
    }
  ]
};

export async function GET() {
  return NextResponse.json({
    agent: "Delta",
    role: "Social Media Marketing Agent",
    status: "ACTIVE",
    platforms: ["WhatsApp", "LinkedIn", "Twitter", "Instagram"],
    content_ready: Object.keys(contentTemplates).length,
    mission: "Auto-generating marketing content for JobLink 360"
  });
}

export async function POST(request: Request) {
  try {
    const { platform, action } = await request.json();
    
    const platforms = ["whatsapp", "linkedin", "twitter", "instagram", "all"];
    
    if (!platforms.includes(platform) && platform !== "all") {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }
    
    const posts = [];
    
    if (platform === "all") {
      for (const plat of ["whatsapp", "linkedin", "twitter", "instagram"]) {
        const content = contentTemplates[plat];
        if (content) {
          const randomIndex = Math.floor(Math.random() * content.length);
          posts.push({
            platform: plat,
            content: content[randomIndex],
            timestamp: new Date().toISOString()
          });
        }
      }
    } else {
      const content = contentTemplates[platform];
      if (content) {
        const randomIndex = Math.floor(Math.random() * content.length);
        posts.push({
          platform: platform,
          content: content[randomIndex],
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Log the posts (simulate posting)
    console.log(`[Delta] Generated ${posts.length} posts for ${platform}`);
    
    return NextResponse.json({
      success: true,
      agent: "Delta",
      posts_generated: posts.length,
      posts: posts,
      message: "Copy these posts and share on your platforms!"
    });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
