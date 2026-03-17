// app/finance/page.tsx
'use client';
import { useState, useEffect } from 'react';
import AdminLogin from '@/components/AdminLogin';
import { TITANIUM_BUSINESS_MODEL } from '@/lib/finance/models/business-model';

export default function FinanceSuite() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'pl' | 'cashflow' | 'balance' | 'projections'>('overview');
  const [financialData, setFinancialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated) {
      fetchFinancialData();
    }
  }, [authenticated]);

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/finance');
      const data = await res.json();
      setFinancialData(data);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] flex items-center justify-center">
        <div className="text-2xl text-[#D4AF37]">Loading Titanium Finance Suite...</div>
      </div>
    );
  }

  const revenue = financialData?.revenue;
  const projections = financialData?.projections;
  const metrics = financialData?.metrics;
  const businessModel = TITANIUM_BUSINESS_MODEL;

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-[#D4AF37] mb-2">💎 TITANIUM FINANCE SUITE</h1>
            <p className="text-[#F5F5DC]/70">Real-time Financial Intelligence | Last Updated: {new Date().toLocaleString()}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.open('/api/finance/revenue', '_blank')}
              className="bg-[#800000] px-4 py-2 rounded-lg text-sm hover:bg-[#A00000] transition"
            >
              📥 Export Data
            </button>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#020202] p-6 rounded-lg border-l-4 border-[#D4AF37]">
            <p className="text-sm text-[#F5F5DC]/60">Monthly Revenue (MRR)</p>
            <p className="text-3xl font-bold text-[#D4AF37]">KES {revenue?.total?.toLocaleString()}</p>
            <p className="text-xs text-green-500 mt-2">↑ 15% vs last month</p>
          </div>
          <div className="bg-[#020202] p-6 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Annual Revenue (ARR)</p>
            <p className="text-3xl font-bold">KES {revenue?.arr?.toLocaleString()}</p>
            <p className="text-xs text-blue-500 mt-2">Projected</p>
          </div>
          <div className="bg-[#020202] p-6 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Gross Margin</p>
            <p className="text-3xl font-bold text-green-500">{businessModel.metrics.grossMargin}%</p>
            <p className="text-xs mt-2">Industry avg: 65%</p>
          </div>
          <div className="bg-[#020202] p-6 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Runway</p>
            <p className="text-3xl font-bold text-green-500">{financialData?.runway?.months} months</p>
            <p className="text-xs mt-2">Cash: KES 15M</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#D4AF37]/20">
          {['overview', 'revenue', 'pl', 'cashflow', 'balance', 'projections'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 capitalize font-bold transition ${
                activeTab === tab 
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' 
                  : 'text-[#F5F5DC]/60 hover:text-[#F5F5DC]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Revenue Streams */}
            <div className="bg-[#020202] p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">💰 REVENUE STREAMS</h2>
              <div className="grid grid-cols-2 gap-6">
                {businessModel.revenueStreams.map((stream) => (
                  <div key={stream.id} className="bg-[#070F1A] p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#D4AF37]">{stream.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        stream.status === 'active' ? 'bg-green-500/20 text-green-500' :
                        stream.status === 'development' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {stream.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#F5F5DC]/60 mb-3">{stream.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>Current: <span className="text-[#D4AF37] font-bold">KES {stream.currentMRR.toLocaleString()}</span></span>
                      <span>Projected: <span className="text-green-500">KES {stream.projectedMRR.toLocaleString()}</span></span>
                    </div>
                    <div className="mt-2 w-full bg-[#070F1A] h-2 rounded-full">
                      <div 
                        className="bg-[#D4AF37] h-2 rounded-full" 
                        style={{width: `${(stream.currentMRR / stream.projectedMRR) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#020202] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-4">📊 KEY METRICS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>CAC</span>
                    <span className="font-bold">KES {metrics?.cac.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LTV</span>
                    <span className="font-bold">KES {metrics?.ltv.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LTV/CAC Ratio</span>
                    <span className="font-bold text-green-500">{metrics?.ltvToCacRatio?.toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Churn Rate</span>
                    <span className="font-bold">{metrics?.churnRate}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#020202] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-4">📈 GROWTH METRICS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>MoM Growth</span>
                    <span className="font-bold text-green-500">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>YoY Projected</span>
                    <span className="font-bold text-green-500">194%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Multiple</span>
                    <span className="font-bold">{businessModel.valuation.multiple}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Valuation</span>
                    <span className="font-bold">KES {businessModel.valuation.current.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#020202] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-4">🎯 OPERATIONAL</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Active Students</span>
                    <span className="font-bold">{businessModel.projections.monthly[0].students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Farmers</span>
                    <span className="font-bold">{businessModel.projections.monthly[0].farmers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yield (MT)</span>
                    <span className="font-bold">{businessModel.projections.monthly[0].yieldTons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Burn Rate</span>
                    <span className="font-bold">KES {metrics?.burnRate.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="bg-[#020202] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">📊 REVENUE BREAKDOWN</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">By Category</h3>
                <div className="space-y-4">
                  {Object.entries(revenue?.breakdown || {}).map(([category, amount]) => (
                    <div key={category}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize">{category}</span>
                        <span className="text-[#D4AF37]">KES {(amount as number).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[#070F1A] h-2 rounded-full">
                        <div 
                          className="bg-[#D4AF37] h-2 rounded-full" 
                          style={{width: `${((amount as number) / revenue.total) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Monthly Trend</h3>
                <div className="space-y-2">
                  {projections?.monthly?.map((month: any) => (
                    <div key={month.month} className="flex justify-between items-center">
                      <span>{month.month}</span>
                      <span className="text-[#D4AF37]">KES {month.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projections' && (
          <div className="bg-[#020202] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">📈 FINANCIAL PROJECTIONS</h2>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              {projections?.annual?.map((year: any) => (
                <div key={year.year} className="bg-[#070F1A] p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-3">{year.year}</h3>
                  <p className="text-sm text-[#F5F5DC]/60">Revenue</p>
                  <p className="text-2xl font-bold mb-2">KES {year.revenue.toLocaleString()}</p>
                  <p className="text-sm text-[#F5F5DC]/60">Profit</p>
                  <p className="text-xl font-bold text-green-500">KES {year.profit.toLocaleString()}</p>
                  <div className="mt-3 pt-3 border-t border-[#D4AF37]/20">
                    <p className="text-xs">Students: {year.students}</p>
                    <p className="text-xs">Farmers: {year.farmers.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#070F1A] p-6 rounded-lg">
              <h3 className="text-lg font-bold text-[#D4AF37] mb-4">5-YEAR PROJECTION</h
Write-Host "💎 Creating Titanium Finance Suite Dashboard..." -ForegroundColor Yellow

$financeSuite = @'
// app/finance/page.tsx
'use client';
import { useState, useEffect } from 'react';
import AdminLogin from '@/components/AdminLogin';
import { TITANIUM_BUSINESS_MODEL } from '@/lib/finance/models/business-model';

export default function FinanceSuite() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'pl' | 'cashflow' | 'balance' | 'projections'>('overview');
  const [financialData, setFinancialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated) {
      fetchFinancialData();
    }
  }, [authenticated]);

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/finance');
      const data = await res.json();
      setFinancialData(data);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] flex items-center justify-center">
        <div className="text-2xl text-[#D4AF37]">Loading Titanium Finance Suite...</div>
      </div>
    );
  }

  const revenue = financialData?.revenue;
  const projections = financialData?.projections;
  const metrics = financialData?.metrics;
  const businessModel = TITANIUM_BUSINESS_MODEL;

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-[#D4AF37] mb-2">💎 TITANIUM FINANCE SUITE</h1>
            <p className="text-[#F5F5DC]/70">Real-time Financial Intelligence | Last Updated: {new Date().toLocaleString()}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.open('/api/finance/revenue', '_blank')}
              className="bg-[#800000] px-4 py-2 rounded-lg text-sm hover:bg-[#A00000] transition"
            >
              📥 Export Data
            </button>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#020202] p-6 rounded-lg border-l-4 border-[#D4AF37]">
            <p className="text-sm text-[#F5F5DC]/60">Monthly Revenue (MRR)</p>
            <p className="text-3xl font-bold text-[#D4AF37]">KES {revenue?.total?.toLocaleString()}</p>
            <p className="text-xs text-green-500 mt-2">↑ 15% vs last month</p>
          </div>
          <div className="bg-[#020202] p-6 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Annual Revenue (ARR)</p>
            <p className="text-3xl font-bold">KES {revenue?.arr?.toLocaleString()}</p>
            <p className="text-xs text-blue-500 mt-2">Projected</p>
          </div>
          <div className="bg-[#020202] p-6 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Gross Margin</p>
            <p className="text-3xl font-bold text-green-500">{businessModel.metrics.grossMargin}%</p>
            <p className="text-xs mt-2">Industry avg: 65%</p>
          </div>
          <div className="bg-[#020202] p-6 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Runway</p>
            <p className="text-3xl font-bold text-green-500">{financialData?.runway?.months} months</p>
            <p className="text-xs mt-2">Cash: KES 15M</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#D4AF37]/20">
          {['overview', 'revenue', 'pl', 'cashflow', 'balance', 'projections'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 capitalize font-bold transition ${
                activeTab === tab 
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' 
                  : 'text-[#F5F5DC]/60 hover:text-[#F5F5DC]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Revenue Streams */}
            <div className="bg-[#020202] p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">💰 REVENUE STREAMS</h2>
              <div className="grid grid-cols-2 gap-6">
                {businessModel.revenueStreams.map((stream) => (
                  <div key={stream.id} className="bg-[#070F1A] p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#D4AF37]">{stream.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        stream.status === 'active' ? 'bg-green-500/20 text-green-500' :
                        stream.status === 'development' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {stream.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#F5F5DC]/60 mb-3">{stream.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>Current: <span className="text-[#D4AF37] font-bold">KES {stream.currentMRR.toLocaleString()}</span></span>
                      <span>Projected: <span className="text-green-500">KES {stream.projectedMRR.toLocaleString()}</span></span>
                    </div>
                    <div className="mt-2 w-full bg-[#070F1A] h-2 rounded-full">
                      <div 
                        className="bg-[#D4AF37] h-2 rounded-full" 
                        style={{width: `${(stream.currentMRR / stream.projectedMRR) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#020202] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-4">📊 KEY METRICS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>CAC</span>
                    <span className="font-bold">KES {metrics?.cac.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LTV</span>
                    <span className="font-bold">KES {metrics?.ltv.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LTV/CAC Ratio</span>
                    <span className="font-bold text-green-500">{metrics?.ltvToCacRatio?.toFixed(1)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Churn Rate</span>
                    <span className="font-bold">{metrics?.churnRate}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#020202] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-4">📈 GROWTH METRICS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>MoM Growth</span>
                    <span className="font-bold text-green-500">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>YoY Projected</span>
                    <span className="font-bold text-green-500">194%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Multiple</span>
                    <span className="font-bold">{businessModel.valuation.multiple}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Valuation</span>
                    <span className="font-bold">KES {businessModel.valuation.current.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#020202] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-4">🎯 OPERATIONAL</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Active Students</span>
                    <span className="font-bold">{businessModel.projections.monthly[0].students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Farmers</span>
                    <span className="font-bold">{businessModel.projections.monthly[0].farmers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yield (MT)</span>
                    <span className="font-bold">{businessModel.projections.monthly[0].yieldTons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Burn Rate</span>
                    <span className="font-bold">KES {metrics?.burnRate.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="bg-[#020202] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">📊 REVENUE BREAKDOWN</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">By Category</h3>
                <div className="space-y-4">
                  {Object.entries(revenue?.breakdown || {}).map(([category, amount]) => (
                    <div key={category}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize">{category}</span>
                        <span className="text-[#D4AF37]">KES {(amount as number).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[#070F1A] h-2 rounded-full">
                        <div 
                          className="bg-[#D4AF37] h-2 rounded-full" 
                          style={{width: `${((amount as number) / revenue.total) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Monthly Trend</h3>
                <div className="space-y-2">
                  {projections?.monthly?.map((month: any) => (
                    <div key={month.month} className="flex justify-between items-center">
                      <span>{month.month}</span>
                      <span className="text-[#D4AF37]">KES {month.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projections' && (
          <div className="bg-[#020202] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">📈 FINANCIAL PROJECTIONS</h2>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              {projections?.annual?.map((year: any) => (
                <div key={year.year} className="bg-[#070F1A] p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-3">{year.year}</h3>
                  <p className="text-sm text-[#F5F5DC]/60">Revenue</p>
                  <p className="text-2xl font-bold mb-2">KES {year.revenue.toLocaleString()}</p>
                  <p className="text-sm text-[#F5F5DC]/60">Profit</p>
                  <p className="text-xl font-bold text-green-500">KES {year.profit.toLocaleString()}</p>
                  <div className="mt-3 pt-3 border-t border-[#D4AF37]/20">
                    <p className="text-xs">Students: {year.students}</p>
                    <p className="text-xs">Farmers: {year.farmers.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#070F1A] p-6 rounded-lg">
              <h3 className="text-lg font-bold text-[#D4AF37] mb-4">5-YEAR PROJECTION</h3>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-[#F5F5DC]/60">Total Revenue</p>
                  <p className="text-xl font-bold">KES {projections?.fiveYear?.totalRevenue?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-[#F5F5DC]/60">Total Profit</p>
                  <p className="text-xl font-bold text-green-500">KES {projections?.fiveYear?.totalProfit?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-[#F5F5DC]/60">Students</p>
                  <p className="text-xl font-bold">{projections?.fiveYear?.students}</p>
                </div>
                <div>
                  <p className="text-sm text-[#F5F5DC]/60">Valuation</p>
                  <p className="text-xl font-bold text-[#D4AF37]">KES {projections?.fiveYear?.valuation?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <button 
            onClick={() => window.open('/api/finance/revenue', '_blank')}
            className="bg-[#800000] p-4 rounded-lg hover:bg-[#A00000] transition"
          >
            <div className="text-2xl mb-2">💰</div>
            <div className="font-bold">Revenue API</div>
          </button>
          <button 
            onClick={() => window.open('/api/finance/profit-loss', '_blank')}
            className="bg-[#800000] p-4 rounded-lg hover:bg-[#A00000] transition"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-bold">P&L Statement</div>
          </button>
          <button 
            onClick={() => window.open('/api/finance/cash-flow', '_blank')}
            className="bg-[#800000] p-4 rounded-lg hover:bg-[#A00000] transition"
          >
            <div className="text-2xl mb-2">💵</div>
            <div className="font-bold">Cash Flow</div>
          </button>
          <button 
            onClick={() => window.open('/api/finance/projections', '_blank')}
            className="bg-[#800000] p-4 rounded-lg hover:bg-[#A00000] transition"
          >
            <div className="text-2xl mb-2">📈</div>
            <div className="font-bold">Projections</div>
          </button>
        </div>
      </div>
    </div>
  );
}