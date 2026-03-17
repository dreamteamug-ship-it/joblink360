// lib/finance/services/finance-service.ts
import { TITANIUM_BUSINESS_MODEL, RevenueStream, MonthlyProjection } from '../models/business-model';

export class FinanceService {
  private businessModel = TITANIUM_BUSINESS_MODEL;

  // Get complete financial snapshot
  async getFinancialSnapshot(): Promise<any> {
    const revenue = this.calculateRevenue();
    const projections = this.calculateProjections();
    const metrics = this.calculateMetrics();
    const runway = this.calculateRunway();

    return {
      timestamp: new Date().toISOString(),
      revenue,
      projections,
      metrics,
      runway,
      businessModel: this.businessModel,
      valuation: this.businessModel.valuation
    };
  }

  // Calculate current revenue
  private calculateRevenue(): any {
    const total = this.businessModel.revenueStreams.reduce(
      (sum, s) => sum + s.currentMRR, 0
    );

    const byStream: Record<string, number> = {};
    this.businessModel.revenueStreams.forEach(s => {
      byStream[s.name] = s.currentMRR;
    });

    const byCategory: Record<string, number> = {};
    this.businessModel.revenueStreams.forEach(s => {
      byCategory[s.category] = (byCategory[s.category] || 0) + s.currentMRR;
    });

    return {
      total,
      byStream,
      byCategory,
      mrr: total,
      arr: total * 12,
      breakdown: {
        training: byCategory.training || 0,
        placement: byCategory.placement || 0,
        agriculture: byCategory.agriculture || 0,
        parking: byCategory.parking || 0,
        tenders: byCategory.tenders || 0,
        investments: byCategory.investments || 0
      }
    };
  }

  // Calculate projections
  private calculateProjections(): any {
    const monthly = this.businessModel.projections.monthly;
    const quarterly = this.businessModel.projections.quarterly;
    const annual = this.businessModel.projections.annual;

    return {
      monthly,
      quarterly,
      annual,
      fiveYear: this.businessModel.projections.fiveYear,
      growthRate: this.calculateGrowthRate(monthly),
      profitability: this.calculateProfitability(monthly)
    };
  }

  // Calculate key metrics
  private calculateMetrics(): any {
    const metrics = this.businessModel.metrics;
    const revenue = this.calculateRevenue();

    return {
      ...metrics,
      ltvToCacRatio: metrics.ltv / metrics.cac,
      revenuePerStudent: revenue.total / this.getActiveStudents(),
      revenuePerFarmer: revenue.total / this.getActiveFarmers(),
      contributionMargin: revenue.total - (metrics.burnRate * 0.6),
      ebitda: revenue.total * 0.45
    };
  }

  // Calculate runway
  private calculateRunway(): any {
    const cash = 15000000; // KES 15M in bank
    const burnRate = this.businessModel.metrics.burnRate;
    const revenue = this.calculateRevenue().total;

    const netBurn = burnRate - revenue;
    const months = netBurn > 0 ? cash / netBurn : 999;

    return {
      cash,
      burnRate,
      netBurn,
      months: Math.min(months, 60),
      status: months > 12 ? 'healthy' : months > 6 ? 'caution' : 'critical'
    };
  }

  // Calculate growth rate from monthly projections
  private calculateGrowthRate(monthly: MonthlyProjection[]): number {
    if (monthly.length < 2) return 0;
    const first = monthly[0].revenue;
    const last = monthly[monthly.length - 1].revenue;
    return ((last - first) / first) * 100;
  }

  // Calculate profitability
  private calculateProfitability(monthly: MonthlyProjection[]): any {
    const totalRevenue = monthly.reduce((sum, m) => sum + m.revenue, 0);
    const totalExpenses = monthly.reduce((sum, m) => sum + m.expenses, 0);
    const totalProfit = monthly.reduce((sum, m) => sum + m.profit, 0);

    return {
      totalRevenue,
      totalExpenses,
      totalProfit,
      margin: (totalProfit / totalRevenue) * 100,
      netProfitMargin: (totalProfit / totalRevenue) * 100
    };
  }

  // Get active students count
  private getActiveStudents(): number {
    return this.businessModel.projections.monthly[0]?.students || 12;
  }

  // Get active farmers count
  private getActiveFarmers(): number {
    return this.businessModel.projections.monthly[0]?.farmers || 847;
  }

  // Get revenue by date range
  async getRevenueByDateRange(startDate: Date, endDate: Date): Promise<any> {
    // In production, query database
    return this.calculateRevenue();
  }

  // Get profit & loss statement
  async getProfitLoss(period: 'monthly' | 'quarterly' | 'annual'): Promise<any> {
    const revenue = this.calculateRevenue();
    const expenses = {
      operational: revenue.total * 0.3,
      marketing: revenue.total * 0.1,
      salaries: revenue.total * 0.15,
      infrastructure: revenue.total * 0.05,
      total: revenue.total * 0.6
    };

    return {
      period,
      revenue: revenue.total,
      expenses,
      grossProfit: revenue.total - expenses.total,
      netProfit: revenue.total * 0.4,
      margins: {
        gross: 40,
        net: 40
      }
    };
  }

  // Get cash flow statement
  async getCashFlow(): Promise<any> {
    const revenue = this.calculateRevenue().total;
    const expenses = revenue * 0.6;
    const investments = 2500000; // New investment this month

    return {
      operatingCash: revenue - expenses,
      investingCash: -investments,
      financingCash: investments,
      netCashFlow: revenue - expenses,
      beginningCash: 15000000,
      endingCash: 15000000 + revenue - expenses,
      timestamp: new Date().toISOString()
    };
  }

  // Get balance sheet
  async getBalanceSheet(): Promise<any> {
    return {
      assets: {
        current: 25000000,
        fixed: 15000000,
        total: 40000000
      },
      liabilities: {
        current: 5000000,
        longTerm: 10000000,
        total: 15000000
      },
      equity: {
        shareCapital: 20000000,
        retainedEarnings: 5000000,
        total: 25000000
      },
      timestamp: new Date().toISOString()
    };
  }
}

export const financeService = new FinanceService();