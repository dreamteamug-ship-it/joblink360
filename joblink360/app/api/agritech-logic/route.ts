import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    production: { hub: "Abim, Uganda", yield_mt_ha: 5.2, cost_per_kg_ugx: 1200, fx_rate_ugx_ksh: 0.035 },
    logistics: { route: "Abim -> Busia -> Katito", distance_km: 480, truck_capacity_mt: 28, cost_per_km_usd: 2.1, border_clearing_usd: 150, fx_rate_usd_ksh: 128 },
    market: { target: "Nyanza Basin (Ahero/Katito)", retail_price_ksh: 175, wholesale_price_ksh: 165 }
  };

  const cost_base_ksh = (data.production.cost_per_kg_ugx * data.production.fx_rate_ugx_ksh);
  const total_transport_usd = (data.logistics.distance_km * data.logistics.cost_per_km_usd) + data.logistics.border_clearing_usd;
  const transport_ksh_per_kg = (total_transport_usd * data.logistics.fx_rate_usd_ksh) / (data.logistics.truck_capacity_mt * 1000);
  const landed_cost_ksh = cost_base_ksh + transport_ksh_per_kg;
  const gross_margin = ((data.market.wholesale_price_ksh - landed_cost_ksh) / data.market.wholesale_price_ksh) * 100;

  return NextResponse.json({
    summary: "Abim-Nyanza Corridor Analysis",
    metrics: {
      landed_cost: landed_cost_ksh.toFixed(2),
      market_wholesale: data.market.wholesale_price_ksh,
      potential_margin_percent: gross_margin.toFixed(2) + "%",
      status: gross_margin > 40 ? "HIGHLY_VIABLE" : "MARGINAL"
    }
  });
}