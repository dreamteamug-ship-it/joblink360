// lib/shop/payments/index.ts
export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  countries: string[];
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  fee: number;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  country: string;
  paymentMethod: string;
  orderId: string;
  customerEmail: string;
  customerPhone?: string;
  callbackUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  qrCode?: string;
  instructions?: string;
  error?: string;
}

// Payment Providers Configuration
export const PAYMENT_PROVIDERS = {
  // Mobile Money - Africa
  MPESA: {
    id: 'mpesa',
    name: 'M-Pesa',
    icon: '??',
    countries: ['KE', 'TZ', 'UG', 'RW', 'CD', 'GH', 'ZM'],
    supportedServices: ['Lipa Na M-Pesa', 'M-Pesa Paybill', 'Till Number'],
    minAmount: 10,
    maxAmount: 500000,
    processingTime: 'Instant',
    fee: 0
  },
  AIRTEL_MONEY: {
    id: 'airtel_money',
    name: 'Airtel Money',
    icon: '??',
    countries: ['KE', 'UG', 'RW', 'ZM', 'MW', 'TZ'],
    minAmount: 10,
    maxAmount: 500000,
    processingTime: 'Instant',
    fee: 0
  },
  TIGO_PESA: {
    id: 'tigo_pesa',
    name: 'Tigo Pesa',
    icon: '??',
    countries: ['TZ'],
    minAmount: 10,
    maxAmount: 300000,
    processingTime: 'Instant',
    fee: 0
  },
  MTN_MOBILE_MONEY: {
    id: 'mtn_mobile',
    name: 'MTN Mobile Money',
    icon: '??',
    countries: ['UG', 'RW', 'GH', 'ZM'],
    minAmount: 10,
    maxAmount: 400000,
    processingTime: 'Instant',
    fee: 0
  },
  ECOCASH: {
    id: 'ecocash',
    name: 'EcoCash',
    icon: '??',
    countries: ['ZW'],
    minAmount: 10,
    maxAmount: 500000,
    processingTime: 'Instant',
    fee: 0
  },
  AFRIPESA: {
    id: 'afripesa',
    name: 'AfriPesa',
    icon: '??',
    countries: ['KE', 'UG', 'TZ', 'RW', 'ZM', 'MW', 'ZW'],
    minAmount: 5,
    maxAmount: 1000000,
    processingTime: 'Instant',
    fee: 0
  },
  
  // International Cards
  VISA: {
    id: 'visa',
    name: 'Visa',
    icon: '??',
    countries: 'all',
    minAmount: 1,
    maxAmount: 1000000,
    processingTime: 'Instant',
    fee: 2.9
  },
  MASTERCARD: {
    id: 'mastercard',
    name: 'Mastercard',
    icon: '??',
    countries: 'all',
    minAmount: 1,
    maxAmount: 1000000,
    processingTime: 'Instant',
    fee: 2.9
  },
  AMEX: {
    id: 'amex',
    name: 'American Express',
    icon: '??',
    countries: 'all',
    minAmount: 1,
    maxAmount: 1000000,
    processingTime: 'Instant',
    fee: 3.5
  },
  
  // Digital Wallets
  PAYPAL: {
    id: 'paypal',
    name: 'PayPal',
    icon: '??',
    countries: 'all',
    minAmount: 1,
    maxAmount: 100000,
    processingTime: 'Instant',
    fee: 3.4
  },
  STRIPE: {
    id: 'stripe',
    name: 'Stripe',
    icon: '?',
    countries: 'all',
    minAmount: 1,
    maxAmount: 1000000,
    processingTime: 'Instant',
    fee: 2.9
  },
  
  // African Digital Wallets
  FLUTTERWAVE: {
    id: 'flutterwave',
    name: 'Flutterwave',
    icon: '??',
    countries: ['NG', 'GH', 'KE', 'UG', 'ZA', 'TZ', 'RW', 'ZM'],
    minAmount: 1,
    maxAmount: 1000000,
    processingTime: 'Instant',
    fee: 2.8
  },
  PAYSTACK: {
    id: 'paystack',
    name: 'Paystack',
    icon: '??',
    countries: ['NG', 'GH', 'ZA', 'KE'],
    minAmount: 1,
    maxAmount: 500000,
    processingTime: 'Instant',
    fee: 2.9
  }
};

export class PaymentProcessor {
  private static instance: PaymentProcessor;
  
  static getInstance() {
    if (!PaymentProcessor.instance) {
      PaymentProcessor.instance = new PaymentProcessor();
    }
    return PaymentProcessor.instance;
  }
  
  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate payment processing
    // In production, this would integrate with actual APIs
    console.log('Processing payment:', request);
    
    // Generate transaction ID
    const transactionId = `TRX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // For demo, simulate success
    return {
      success: true,
      transactionId: transactionId,
      paymentUrl: `/payment/confirm?txn=${transactionId}`,
      instructions: this.getPaymentInstructions(request.paymentMethod)
    };
  }
  
  private getPaymentInstructions(method: string): string {
    const instructions: Record<string, string> = {
      mpesa: 'Enter M-Pesa PIN to complete payment. You will receive a confirmation SMS.',
      airtel_money: 'Dial *400# and follow prompts to complete payment.',
      ecocash: 'Dial *151# and enter your EcoCash PIN to complete transaction.',
      visa: 'Enter your card details. Your payment is secured with 3D Secure.',
      paypal: 'You will be redirected to PayPal to complete payment.',
      flutterwave: 'Select your preferred payment method to complete checkout.'
    };
    return instructions[method] || 'Follow the prompts to complete your payment.';
  }
  
  async verifyPayment(transactionId: string): Promise<boolean> {
    // Verify payment with provider
    return true;
  }
  
  async refundPayment(transactionId: string, amount: number): Promise<boolean> {
    // Process refund
    return true;
  }
}

export const paymentProcessor = PaymentProcessor.getInstance();
