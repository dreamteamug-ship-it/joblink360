import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    solar_capacity_kw: 50, // 50kW array at Katito Hub
    avg_sun_hours: 5.5,    // Nyanza daily average
    storage_capacity_kwh: 120, // Battery bank
    grid_off_peak_rate: 8.00,  // KSh per kWh (E-mobility tariff)
    grid_peak_rate: 22.00,     // KSh per kWh
    ev_fleet_demand_kwh: 180   // Total daily fleet requirement
  };

  const daily_solar_gen = config.solar_capacity_kw * config.avg_sun_hours;
  const grid_requirement = Math.max(0, config.ev_fleet_demand_kwh - daily_solar_gen);
  
  // Cost if 100% Grid (Mixed Peak/Off-Peak)
  const legacy_cost = config.ev_fleet_demand_kwh * 15.00; 
  // Cost with Solar + Off-peak Grid
  const sovereign_cost = grid_requirement * config.grid_off_peak_rate;
  
  const daily_savings = legacy_cost - sovereign_cost;

  return NextResponse.json({
    summary: "Katito Hub Solar-Grid Hybrid Logic",
    metrics: {
      solar_contribution: ((daily_solar_gen / config.ev_fleet_demand_kwh) * 100).toFixed(1) + "%",
      daily_energy_savings_ksh: daily_savings.toFixed(2),
      energy_independence_score: daily_solar_gen > config.ev_fleet_demand_kwh ? "TOTAL" : "PARTIAL",
      status: "RELIANT"
    },
    intel: "Hybrid strategy reduces last-mile energy costs to near-zero during peak solar months."
  });
}