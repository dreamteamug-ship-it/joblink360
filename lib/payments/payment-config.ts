// lib/payments/payment-config.ts
export interface PaymentChannel {
  name: string;
  type: 'mobile_money' | 'bank_transfer' | 'card' | 'crypto' | 'international';
  countries: string[];
  currencies: string[];
  fees: string;
  processingTime: string;
  limits: { min: number; max: number };
  instructions: string[];
}

export const PAYMENT_CHANNELS: Record<string, PaymentChannel> = {
  MPESA: {
    name: "M-PESA (Kenya)",
    type: "mobile_money",
    countries: ["KE"],
    currencies: ["KES"],
    fees: "1% (max KES 150)",
    processingTime: "Instant",
    limits: { min: 10, max: 150000 },
    instructions: ["Paybill: 400200", "Account: 40045731", "Amount: Enter amount"]
  },
  TIGOPESA: {
    name: "TigoPesa (Tanzania)",
    type: "mobile_money",
    countries: ["TZ"],
    currencies: ["TZS"],
    fees: "0.5%",
    processingTime: "Instant",
    limits: { min: 1000, max: 3000000 },
    instructions: ["Dial *150*01#", "Select Lipa kwa TigoPesa", "Enter Business Number"]
  },
  MTN_MOMO: {
    name: "MTN MoMo (Uganda)",
    type: "mobile_money",
    countries: ["UG"],
    currencies: ["UGX"],
    fees: "1%",
    processingTime: "Instant",
    limits: { min: 1000, max: 5000000 },
    instructions: ["Dial *165#", "Select MoMoPay", "Enter Merchant Code"]
  },
  NCBA_KES: {
    name: "NCBA Bank Kenya (KES)",
    type: "bank_transfer",
    countries: ["KE"],
    currencies: ["KES"],
    fees: "KES 50",
    processingTime: "1-2 hours",
    limits: { min: 1000, max: 10000000 },
    instructions: ["Account Name: Delite Production House", "Account Number: 8515130017", "Bank: NCBA Bank Kenya"]
  },
  NCBA_USD: {
    name: "NCBA Bank Kenya (USD)",
    type: "bank_transfer",
    countries: ["KE"],
    currencies: ["USD"],
    fees: "$10",
    processingTime: "1-2 business days",
    limits: { min: 100, max: 500000 },
    instructions: ["Account Name: Delite Production House", "Account Number: 8515130018", "SWIFT: CBAFKENX"]
  },
  CHINA_SILK_ROAD: {
    name: "China Silk Road",
    type: "international",
    countries: ["CN"],
    currencies: ["CNY", "USD"],
    fees: "2.5%",
    processingTime: "Instant",
    limits: { min: 100, max: 500000 },
    instructions: ["WeChat Pay: Scan QR Code", "Alipay: Scan QR Code", "UnionPay: Enter card details"]
  },
  SWIFT: {
    name: "SWIFT International Transfer",
    type: "international",
    countries: ["Global"],
    currencies: ["USD", "EUR", "GBP"],
    fees: "$25-50",
    processingTime: "2-5 business days",
    limits: { min: 500, max: 10000000 },
    instructions: ["Beneficiary: Delite Production House", "SWIFT: CBAFKENX", "Account: 8515130018"]
  },
  BITCOIN: {
    name: "Bitcoin (BTC)",
    type: "crypto",
    countries: ["Global"],
    currencies: ["BTC"],
    fees: "0.0001 BTC",
    processingTime: "10-60 minutes",
    limits: { min: 0.001, max: 10 },
    instructions: ["Send to: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", "Network: Bitcoin", "Confirmations: 3"]
  }
};

export const getChannelsForCountry = (code: string) => 
  Object.values(PAYMENT_CHANNELS).filter(c => c.countries.includes(code) || c.countries.includes("Global"));
