// lib/payments/payment-config.ts
export interface PaymentProvider {
  name: string;
  provider: string;
  publicKey: string;
  secretKey: string;
  webhookUrl: string;
  supportedCurrencies: string[];
  countries: string[];
  fees: {
    percentage: number;
    fixed: number;
  };
}

export const PAYMENT_PROVIDERS: PaymentProvider[] = [
  {
    name: "mpesa-ke",
    provider: "MPesa",
    publicKey: process.env.MPESA_PUBLIC_KEY || "",
    secretKey: process.env.MPESA_SECRET_KEY || "",
    webhookUrl: "/api/payments/callback/mpesa",
    supportedCurrencies: ["KES"],
    countries: ["KE"],
    fees: {
      percentage: 0.5,
      fixed: 0
    }
  },
  {
    name: "stripe-global",
    provider: "Stripe",
    publicKey: process.env.STRIPE_PUBLIC_KEY || "",
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookUrl: "/api/payments/callback/stripe",
    supportedCurrencies: ["USD", "EUR", "GBP", "KES", "ZAR", "UGX"],
    countries: ["KE", "UG", "TZ", "RW", "ZA", "ZM", "ZW"], // All 26 countries
    fees: {
      percentage: 2.9,
      fixed: 0.30
    }
  },
  {
    name: "paypal-international",
    provider: "PayPal",
    publicKey: process.env.PAYPAL_CLIENT_ID || "",
    secretKey: process.env.PAYPAL_SECRET || "",
    webhookUrl: "/api/payments/callback/paypal",
    supportedCurrencies: ["USD", "EUR", "GBP", "KES", "ZAR"],
    countries: ["KE", "UG", "TZ", "RW", "ZA", "ZM", "ZW", "NA", "BW"],
    fees: {
      percentage: 3.49,
      fixed: 0.49
    }
  },
  {
    name: "flutterwave-africa",
    provider: "Flutterwave",
    publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY || "",
    secretKey: process.env.FLUTTERWAVE_SECRET_KEY || "",
    webhookUrl: "/api/payments/callback/flutterwave",
    supportedCurrencies: ["KES", "UGX", "TZS", "RWF", "ZAR", "NGN", "GHS"],
    countries: ["KE", "UG", "TZ", "RW", "ZA", "NG", "GH", "ZM", "ZW"],
    fees: {
      percentage: 2.5,
      fixed: 0
    }
  }
];

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "basic-job-seeker",
    name: "Job Seeker Basic",
    description: "Access to job listings and basic CV review",
    price: 9.99,
    currency: "USD",
    features: [
      "500+ international job listings",
      "Basic CV review",
      "Email alerts",
      "Mobile app access"
    ]
  },
  {
    id: "premium-job-seeker",
    name: "Job Seeker Premium", 
    description: "Advanced job matching and career coaching",
    price: 29.99,
    currency: "USD",
    popular: true,
    features: [
      "All Basic features",
      "AI-powered job matching",
      "Personal career coach",
      "Interview preparation",
      "Salary negotiation support",
      "Priority customer support"
    ]
  },
  {
    id: "business-basic",
    name: "Business Basic",
    description: "Post jobs and access talent pool",
    price: 49.99,
    currency: "USD",
    features: [
      "Post up to 5 jobs/month",
      "Access to 50,000+ candidates",
      "Basic analytics",
      "Standard support"
    ]
  },
  {
    id: "business-premium",
    name: "Business Premium",
    description: "Complete recruitment solution",
    price: 199.99,
    currency: "USD",
    features: [
      "Unlimited job postings",
      "AI candidate matching",
      "Advanced analytics",
      "Dedicated account manager",
      "Custom branding",
      "API access"
    ]
  },
  {
    id: "titanium-enterprise",
    name: "Titanium Enterprise",
    description: "Full suite with AI agents and custom solutions",
    price: 999.99,
    currency: "USD",
    features: [
      "All Business Premium features",
      "Custom AI agent development",
      "White-label solution",
      "Dedicated infrastructure",
      "24/7 premium support",
      "Custom integrations"
    ]
  }
];

export const getSupportedProviders = (countryCode: string): PaymentProvider[] => {
  return PAYMENT_PROVIDERS.filter(provider => 
    provider.countries.includes(countryCode) || provider.countries.includes("ALL")
  );
};

export const getPackageById = (id: string): ServicePackage | undefined => {
  return SERVICE_PACKAGES.find(pkg => pkg.id === id);
};
