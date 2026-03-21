// lib/subscription/enterprise/tiers.ts (UPDATED)
export const EnterpriseTiers = {
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    price: 5000, // KES (2x previous)
    priceUSD: 40,
    features: [
      'Full AI processing',
      'Document generation',
      'Success probability scoring',
      'Email support',
      'Application tracking'
    ],
    commission: {
      funding_fee: 0.03,
      tender_fee: 0.03,
      fee_cap: 500000
    },
    intervention: {
      level: 'automated',
      human_contact: false,
      meeting_support: false,
      physical_dispatch: false
    }
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 20000,
    priceUSD: 160,
    features: [
      'Everything in Professional',
      'Priority processing',
      'Dedicated AI agent',
      'Human intervention on request',
      'Virtual meeting support',
      'Document review'
    ],
    commission: {
      funding_fee: 0.025,
      tender_fee: 0.025,
      fee_cap: 750000
    },
    intervention: {
      level: 'on_demand',
      human_contact: true,
      meeting_support: true,
      physical_dispatch: false,
      meetings_per_month: 3
    }
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 100000,
    priceUSD: 800,
    features: [
      'Everything in Premium',
      'Dedicated account manager',
      'Unlimited human intervention',
      'Physical dispatch service',
      'In-person meetings',
      'Deal closure support',
      'Document hard copies',
      'Opening attendance',
      'Last mile closure'
    ],
    commission: {
      funding_fee: 0.02,
      tender_fee: 0.02,
      fee_cap: 1000000
    },
    intervention: {
      level: 'full',
      human_contact: true,
      meeting_support: true,
      physical_dispatch: true,
      in_person_meetings: true,
      opening_attendance: true,
      last_mile_closure: true,
      dedicated_manager: true,
      unlimited_support: true
    }
  }
};

export const calculateCommission = (tier: string, transactionValue: number, type: 'funding' | 'tender'): any => {
  const tierConfig = EnterpriseTiers[tier.toUpperCase()] || EnterpriseTiers.PROFESSIONAL;
  const feeRate = type === 'funding' ? tierConfig.commission.funding_fee : tierConfig.commission.tender_fee;
  const calculatedFee = transactionValue * feeRate;
  const finalFee = Math.min(calculatedFee, tierConfig.commission.fee_cap);
  
  return {
    rate: feeRate * 100,
    calculated: calculatedFee,
    capped: finalFee,
    cap_limit: tierConfig.commission.fee_cap,
    currency: 'KES'
  };
};