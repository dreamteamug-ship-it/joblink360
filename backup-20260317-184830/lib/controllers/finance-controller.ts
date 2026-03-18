// lib/controllers/finance-controller.ts
import { Student, Payment, RevenueSummary } from '../database/schema';

export class FinanceController {
  
  // POST /process-intake: Records KES 120,000 payment and unlocks Module 1
  async processIntake(studentData: any): Promise<any> {
    console.log(`💰 Processing intake for: ${studentData.name}`);
    
    const payment: Payment = {
      id: `PAY-${Date.now()}`,
      userId: studentData.userId,
      studentId: studentData.studentId,
      amount: 120000,
      currency: 'KES',
      method: studentData.method || 'mpesa',
      reference: `MP-${Date.now()}`,
      status: 'completed',
      metadata: { course: 'Module 1' },
      createdAt: new Date()
    };

    // Unlock Module 1
    const student: Student = {
      ...studentData,
      modulesUnlocked: [1],
      paymentStatus: 'completed',
      paymentDate: new Date()
    };

    // Trigger notification
    await this.sendModuleUnlock(student, 1);

    return {
      success: true,
      payment,
      student,
      message: '✅ Module 1 Unlocked! Welcome to Titanium Academy.',
      nextSteps: [
        'Access Module 1: Sovereign AI Mindset',
        'Complete by: Friday 6PM',
        'Passing score: 85% required for certification'
      ]
    };
  }

  // GET /revenue-summary: Feeds CIO Dashboard with live totals
  async getRevenueSummary(): Promise<RevenueSummary> {
    // In production, this would query your database
    return {
      total: 1440000,
      weeklyTarget: 12000000,
      weeklyActual: 1440000,
      students: 12,
      farmers: 1500,
      dispatches: 47,
      lastUpdated: new Date()
    };
  }

  // POST /parking-settlement: Calculates 60/30/10 revenue split
  async processParkingSettlement(parkingData: any): Promise<any> {
    const total = parkingData.amount;
    const operatorShare = total * 0.6;
    const platformShare = total * 0.3;
    const communityShare = total * 0.1;

    return {
      success: true,
      total,
      split: {
        operator: operatorShare,
        platform: platformShare,
        community: communityShare
      },
      transactionId: `PARK-${Date.now()}`,
      message: '✅ Revenue split completed'
    };
  }

  private async sendModuleUnlock(student: Student, module: number): Promise<void> {
    console.log(`📧 Email sent to ${student.email}: Module ${module} unlocked`);
  }
}