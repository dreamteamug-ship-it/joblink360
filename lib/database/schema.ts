// lib/database/schema.ts
export interface DatabaseSchema {
  users: User[];
  students: Student[];
  farmers: Farmer[];
  payments: Payment[];
  yields: Yield[];
  dispatches: Dispatch[];
  parking: Parking[];
  exams: Exam[];
  matches: Match[];
}

// A. Finance & Revenue Models
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'cio' | 'cto' | 'admin' | 'student' | 'farmer' | 'driver';
  createdAt: Date;
  lastLogin: Date;
}

export interface Student {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  course: 'module1' | 'module2' | 'module3';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentAmount: number;
  paymentDate: Date;
  modulesUnlocked: number[];
  examScores: ExamScore[];
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  studentId?: string;
  amount: number;
  currency: 'KES' | 'USD' | 'EUR';
  method: 'mpesa' | 'card' | 'bank' | 'crypto';
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  metadata: any;
  createdAt: Date;
}

export interface RevenueSummary {
  total: number;
  weeklyTarget: number;
  weeklyActual: number;
  students: number;
  farmers: number;
  dispatches: number;
  lastUpdated: Date;
}

// B. Agribusiness & Supply Models
export interface Farmer {
  id: string;
  userId: string;
  farmerId: string;
  name: string;
  location: string;
  region: 'Abim' | 'Mityana' | 'Nairobi' | 'Kisumu';
  cropTypes: ('Soybeans' | 'Maize' | 'Avocado')[];
  totalAcres: number;
  verified: boolean;
  createdAt: Date;
}

export interface Yield {
  id: string;
  farmerId: string;
  cropType: 'Soybeans' | 'Maize' | 'Avocado';
  quantity: number; // Metric Tons
  quality: 'A' | 'B' | 'C';
  status: 'recorded' | 'verified' | 'dispatched';
  recordedAt: Date;
  verifiedAt?: Date;
  dispatchedAt?: Date;
}

export interface Inventory {
  cropType: string;
  totalTons: number;
  warehouse: 'Mityana' | 'Nairobi' | 'Kisumu';
  value: number;
  lastUpdated: Date;
}

export interface Dispatch {
  id: string;
  dispatchId: string;
  farmerId: string;
  driverId: string;
  cropType: string;
  quantity: number;
  origin: string;
  destination: string;
  status: 'at-farm' | 'in-transit' | 'at-hub' | 'delivered';
  estimatedArrival: Date;
  actualArrival?: Date;
  route: string[];
  temperature?: number;
  createdAt: Date;
}

// C. Talent & Matchmaking Models
export interface Exam {
  id: string;
  studentId: string;
  module: number;
  score: number;
  passingScore: number;
  passed: boolean;
  answers: any[];
  submittedAt: Date;
  gradedAt: Date;
}

export interface ExamScore {
  module: number;
  score: number;
  date: Date;
}

export interface Tender {
  id: string;
  title: string;
  source: 'UN' | 'WorldBank' | 'UAE' | 'AfDB' | 'EU';
  sector: 'Health' | 'Agriculture' | 'AI' | 'Infrastructure';
  budget: number;
  currency: string;
  deadline: Date;
  requirements: string[];
  matchScore: number;
  matchedProjects: string[];
  status: 'open' | 'applied' | 'won' | 'lost';
}

export interface Match {
  id: string;
  studentId: string;
  studentName: string;
  tenderId: string;
  tenderTitle: string;
  matchScore: number;
  status: 'pending' | 'applied' | 'interview' | 'placed';
  appliedAt?: Date;
  createdAt: Date;
}

// D. Infrastructure Models
export interface Parking {
  id: string;
  userId: string;
  spotId: string;
  location: string;
  duration: number;
  amount: number;
  revenueSplit: {
    operator: number; // 60%
    platform: number; // 30%
    community: number; // 10%
  };
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface ParkingRevenue {
  total: number;
  operatorShare: number;
  platformShare: number;
  communityShare: number;
  date: Date;
}