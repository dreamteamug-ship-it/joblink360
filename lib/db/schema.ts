// lib/db/schema.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'trainer' | 'employer' | 'funder' | 'admin';
  profile: {
    skills: string[];
    languages: string[];
    location: string;
    bio: string;
    verified: boolean;
  };
  wallet: {
    balance: number;
    currency: 'KES' | 'USD' | 'CNY';
    mpesa?: string;
    bank?: string;
  };
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  category: 'ai' | 'data' | 'development' | 'design' | 'marketing' | 'translation';
  level: 'entry' | 'intermediate' | 'expert';
  location: string;
  remote: boolean;
  salary: {
    min: number;
    max: number;
    currency: 'KES' | 'USD';
  };
  requirements: string[];
  languages: string[];
  description: string;
  postedBy: string;
  postedAt: Date;
  deadline: Date;
  status: 'open' | 'closed' | 'filled';
  applicants: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // hours
  language: string[];
  trainer: string;
  price: number;
  curriculum: {
    module: string;
    lessons: string[];
  }[];
  enrolled: number;
  rating: number;
  certificate: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: 'mpesa' | 'china-silk' | 'swift' | 'card';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  description: string;
  timestamp: Date;
  metadata: any;
}

export interface Match {
  id: string;
  userId: string;
  targetId: string;
  targetType: 'job' | 'course' | 'funding' | 'tender';
  score: number;
  reasons: string[];
  status: 'pending' | 'viewed' | 'applied' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Tender {
  id: string;
  title: string;
  organization: string;
  category: string;
  value: number;
  deadline: Date;
  requirements: string[];
  documents: string[];
  status: 'open' | 'closed' | 'awarded';
}

export interface Funding {
  id: string;
  name: string;
  provider: string;
  type: 'grant' | 'loan' | 'equity';
  amount: {
    min: number;
    max: number;
  };
  focus: string[];
  requirements: string[];
  deadline: Date;
  status: 'open' | 'closed';
}
