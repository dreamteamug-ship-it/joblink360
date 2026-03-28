import { NextResponse } from 'next/server';

export async function GET() {
  const params = {
    ice_cost_per_km: 16.50, // Average Petrol/Diesel Last-Mile cost
    ev_cost_per_km: 1.95,   // Naivasha EV + KPLC E-mobility Tariff
    last_mile_distance_km: 45, // Katito Hub to surrounding Nyanza markets
    volume_mt: 28, // Per container load from Abim
    trips_required: 56, // 500kg per EV trip
  };

  const ice_total = params.ice_cost_per_km * params.last_mile_distance_km * params.trips_required;
  const ev_total = params.ev_cost_per_km * params.last_mile_distance_km * params.trips_required;
  const savings_ksh = ice_total - ev_total;
  const margin_boost = (savings_ksh / (ice_total + 1000000)) * 100; // Relative to a 1M KSh load value

  return NextResponse.json({
    summary: "Naivasha EV Fleet Optimization",
    metrics: {
      daily_savings_ksh: savings_ksh.toFixed(2),
      ev_efficiency_gain: "88.2%",
      sovereign_margin_boost: margin_boost.toFixed(2) + "%",
      status: "DOMINANT_LOGISTICS"
    },
    intel: "Using Naivasha-assembled tricycles removes fuel volatility from the Nyanza supply chain."
  });
}