// lib/subscription/tiers.ts
export const SubscriptionTiers = {
  BASIC: {
    id: 'basic',
    name: 'Basic',
    price: 0,
    priceUSD: 0,
    features: [
      'View funding opportunities',
      'View tenders',
      'Basic document templates',
      'Email support'
    ],
    limits: {
      applications_per_month: 3,
      document_generations: 5,
      ai_analyses: 3
    }
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    price: 2500,
    priceUSD: 20,
    features: [
      'Everything in Basic',
      'Full document suite',
      'AI proposal generation',
      'Success probability analysis',
      'Priority support',
      'Multi-country access',
      'Annexure attachments'
    ],
    limits: {
      applications_per_month: 20,
      document_generations: 50,
      ai_analyses: 30
    }
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 10000,
    priceUSD: 80,
    features: [
      'Everything in Professional',
      'Unlimited applications',
      'Dedicated account manager',
      'Custom branding',
      'API access',
      'Bulk document generation',
      'Team collaboration',
      'Priority AI processing'
    ],
    limits: {
      applications_per_month: 999,
      document_generations: 999,
      ai_analyses: 999
    }
  }
};

export const getTierAccess = (tier: string) => {
  return SubscriptionTiers[tier.toUpperCase()] || SubscriptionTiers.BASIC;
};

export const checkAccess = (tier: string, feature: string): boolean => {
  const tierConfig = getTierAccess(tier);
  return tierConfig.features.includes(feature);
};