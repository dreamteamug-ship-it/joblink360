// src/lib/ai/regional-swarm.ts
export const activateWestAfricaSwarm = () => {
  return {
    nodes: [
      { country: "Nigeria", currency: "NGN", gateway: "Flutterwave/Paystack" },
      { country: "Ghana", currency: "GHS", gateway: "AfriPesa" }
    ],
    payout_logic: "70% Agent | 30% Platform", //
    mission: "Founding 1000 West Africa Launch"
  };
};
