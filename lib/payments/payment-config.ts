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
    instructions: ["Paybill: 400200", "Account: 40045731"]
  },
  TIGOPESA: {
    name: "TigoPesa (Tanzania)",
    type: "mobile_money",
    countries: ["TZ"],
    currencies: ["TZS"],
    fees: "0.5%",
    processingTime: "Instant",
    limits: { min: 1000, max: 3000000 },
    instructions: ["Dial *150*01#", "Enter Business Number"]
  },
  NCBA_KES: {
    name: "NCBA Bank Kenya (KES)",
    type: "bank_transfer",
    countries: ["KE"],
    currencies: ["KES"],
    fees: "KES 50",
    processingTime: "1-2 hours",
    limits: { min: 1000, max: 10000000 },
    instructions: ["Account: 8515130017", "Name: Delite Production House"]
  },
  NCBA_USD: {
    name: "NCBA Bank Kenya (USD)",
    type: "bank_transfer",
    countries: ["KE"],
    currencies: ["USD"],
    fees: "$10",
    processingTime: "1-2 days",
    limits: { min: 100, max: 500000 },
    instructions: ["Account: 8515130018", "SWIFT: CBAFKENX"]
  },
  CHINA_SILK_ROAD: {
    name: "China Silk Road",
    type: "international",
    countries: ["CN"],
    currencies: ["CNY", "USD"],
    fees: "2.5%",
    processingTime: "Instant",
    limits: { min: 100, max: 500000 },
    instructions: ["WeChat Pay", "Alipay", "UnionPay"]
  },
  SWIFT: {
    name: "SWIFT International",
    type: "international",
    countries: ["Global"],
    currencies: ["USD", "EUR"],
    fees: "$25-50",
    processingTime: "2-5 days",
    limits: { min: 500, max: 10000000 },
    instructions: ["SWIFT: CBAFKENX", "Account: 8515130018"]
  }
};