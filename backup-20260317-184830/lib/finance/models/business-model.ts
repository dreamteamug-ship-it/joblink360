// lib/finance/models/business-model.ts
export interface BusinessModel {
  name: string;
  description: string;
  revenueStreams: RevenueStream[];
  projections: Projections;
  metrics: KeyMetrics;
  valuation: Valuation;
}

export interface RevenueStream {
  id: string;
  name: string;
  category: 'training' | 'placement' | 'agriculture' | 'parking' | 'tenders' | 'investments';
  description: string;
  currentMRR: number; // Monthly Recurring Revenue
  projectedMRR: number;
  growthRate: number; // Percentage
  margins: number; // Percentage
  status: 'active' | 'development' | 'planned';
}

export interface Projections {
  monthly: MonthlyProjection[];
  quarterly: QuarterlyProjection[];
  annual: AnnualProjection[];
  fiveYear: FiveYearProjection;
}

export interface MonthlyProjection {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  students: number;
  farmers: number;
  yieldTons: number;
}

export interface KeyMetrics {
  cac: number; // Customer Acquisition Cost
  ltv: number; // Lifetime Value
  churnRate: number;
  burnRate: number;
  runway: number; // Months
  grossMargin: number;
  netMargin: number;
}

export interface Valuation {
  current: number;
  projected: number;
  multiple: number;
  lastRound: {
    date: string;
    amount: number;
    valuation: number;
    investors: string[];
  };
}

export const TITANIUM_BUSINESS_MODEL: BusinessModel = {
  name: "Titanium Core Intelligence Grid",
  description: "Integrated platform connecting talent, agriculture, and infrastructure through AI",
  
  revenueStreams: [
    {
      id: "RS-001",
      name: "Sovereign 100 Training",
      category: "training",
      description: "AI certification program for Founding 100 students",
      currentMRR: 120000, // KES 120k per student × 12 students
      projectedMRR: 1200000, // KES 1.2M at full capacity
      growthRate: 15, // 15% monthly growth
      margins: 70, // 70% margins
      status: 'active'
    },
    {
      id: "RS-002",
      name: "Global Job Placement Fee",
      category: "placement",
      description: "15% placement fee on international salaries",
      currentMRR: 150000, // KES 150k from 7 placements
      projectedMRR: 1500000,
      growthRate: 20,
      margins: 90,
      status: 'active'
    },
    {
      id: "RS-003",
      name: "Emerald Agri-Commodity Trading",
      category: "agriculture",
      description: "Margin on crop sales (KES 5,000/ton)",
      currentMRR: 4200000, // KES 4.2M from 840 tons × KES 5,000 margin
      projectedMRR: 25000000,
      growthRate: 25,
      margins: 15,
      status: 'active'
    },
    {
      id: "RS-004",
      name: "Smart Parking Infrastructure",
      category: "parking",
      description: "30% platform fee on parking revenue",
      currentMRR: 450000, // KES 450k from 20 units
      projectedMRR: 2700000,
      growthRate: 30,
      margins: 80,
      status: 'development'
    },
    {
      id: "RS-005",
      name: "Tender Management Fee",
      category: "tenders",
      description: "5% success fee on funded tenders",
      currentMRR: 0, // Pipeline stage
      projectedMRR: 12500000,
      growthRate: 40,
      margins: 95,
      status: 'planned'
    },
    {
      id: "RS-006",
      name: "Investment Returns",
      category: "investments",
      description: "Equity stakes in placed graduates' ventures",
      currentMRR: 0,
      projectedMRR: 5000000,
      growthRate: 50,
      margins: 100,
      status: 'planned'
    }
  ],

  projections: {
    monthly: [
      { month: "2026-03", revenue: 4920000, expenses: 1476000, profit: 3444000, students: 12, farmers: 847, yieldTons: 840 },
      { month: "2026-04", revenue: 6150000, expenses: 1845000, profit: 4305000, students: 18, farmers: 950, yieldTons: 950 },
      { month: "2026-05", revenue: 7687500, expenses: 2306250, profit: 5381250, students: 25, farmers: 1100, yieldTons: 1100 },
      { month: "2026-06", revenue: 9609375, expenses: 2882812, profit: 6726563, students: 35, farmers: 1300, yieldTons: 1300 },
      { month: "2026-07", revenue: 12011719, expenses: 3603516, profit: 8408203, students: 48, farmers: 1500, yieldTons: 1500 },
      { month: "2026-08", revenue: 15014648, expenses: 4504394, profit: 10510254, students: 65, farmers: 1700, yieldTons: 1700 }
    ],
    quarterly: [
      { quarter: "Q1 2026", revenue: 14760000, expenses: 4428000, profit: 10332000, students: 12, farmers: 847 },
      { quarter: "Q2 2026", revenue: 23449219, expenses: 7034766, profit: 16414453, students: 35, farmers: 1300 },
      { quarter: "Q3 2026", projected: true, revenue: 45000000, expenses: 13500000, profit: 31500000, students: 85, farmers: 2000 },
      { quarter: "Q4 2026", projected: true, revenue: 85000000, expenses: 25500000, profit: 59500000, students: 150, farmers: 3000 }
    ],
    annual: [
      { year: 2026, revenue: 85000000, expenses: 25500000, profit: 59500000, students: 150, farmers: 3000 },
      { year: 2027, revenue: 250000000, expenses: 75000000, profit: 175000000, students: 500, farmers: 5000 },
      { year: 2028, revenue: 750000000, expenses: 225000000, profit: 525000000, students: 1500, farmers: 10000 }
    ],
    fiveYear: {
      totalRevenue: 2500000000,
      totalProfit: 1750000000,
      students: 5000,
      farmers: 25000,
      valuation: 5000000000
    }
  },

  metrics: {
    cac: 25000, // KES 25k per student acquisition
    ltv: 600000, // KES 600k lifetime value
    churnRate: 5, // 5% churn
    burnRate: 1500000, // KES 1.5M monthly burn
    runway: 24, // 24 months runway
    grossMargin: 70,
    netMargin: 45
  },

  valuation: {
    current: 85000000, // KES 85M based on 2026 revenue × 1x multiple
    projected: 5000000000, // KES 5B by 2028
    multiple: 10,
    lastRound: {
      date: "2026-01-15",
      amount: 25000000,
      valuation: 75000000,
      investors: ["Angel Investors", "Dreamteam Consulting"]
    }
  }
};

// Revenue Stream Calculator
export function calculateRevenueStreams(streams: RevenueStream[]): {
  totalMRR: number;
  projectedMRR: number;
  breakdown: Record<string, number>;
} {
  const totalMRR = streams.reduce((sum, s) => sum + s.currentMRR, 0);
  const projectedMRR = streams.reduce((sum, s) => sum + s.projectedMRR, 0);
  
  const breakdown: Record<string, number> = {};
  streams.forEach(s => {
    breakdown[s.category] = (breakdown[s.category] || 0) + s.currentMRR;
  });

  return { totalMRR, projectedMRR, breakdown };
}