export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

const BANK_CONFIG = {
  bankName: "NCBA Bank Kenya",
  accountName: "Altovex Global / Delite Production House",
  accountNumber: "8515130017", // Your NCBA account number
  currency: "KES",
  branch: "Upperhill",
  swiftCode: "CBAFKENX" // For international transfers
};

export async function POST(req: Request) {
  try {
    const { amount, reference } = await req.json();

    const transactionRef = reference || `NCBA-${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: "Bank transfer instructions",
      data: {
        bankName: BANK_CONFIG.bankName,
        accountName: BANK_CONFIG.accountName,
        accountNumber: BANK_CONFIG.accountNumber,
        amount,
        currency: BANK_CONFIG.currency,
        swiftCode: BANK_CONFIG.swiftCode,
        reference: transactionRef,
        instructions: [
          "Log into your NCBA Internet Banking",
          "Select 'Pay Bills' or 'Transfer'",
          "Enter account number: " + BANK_CONFIG.accountNumber,
          "Account name: " + BANK_CONFIG.accountName,
          "Amount: KES " + amount,
          "Reference: " + transactionRef,
          "Confirm and authorize the transaction"
        ]
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}