// lib/core/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'funder' | 'project_owner' | 'admin';
  skills: string[];
  interests: string[];
  location: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  category: 'tech' | 'health' | 'agriculture' | 'climate' | 'community' | 'youth' | 'women';
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: Date;
  deadline: Date;
  status: 'open' | 'closed' | 'draft';
}

export interface Training {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'workshop' | 'certification';
  category: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  outcomes: string[];
  cost: number;
  startDate: Date;
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  category: 'community' | 'environment' | 'climate' | 'health' | 'agriculture' | 'youth' | 'women';
  description: string;
  objectives: string[];
  budget: number;
  fundingNeeded: number;
  status: 'seeking_funding' | 'funded' | 'in_progress' | 'completed';
  location: string;
  beneficiaries: number;
  sustainability: string;
  documents: Document[];
}

export interface Funder {
  id: string;
  name: string;
  type: 'government' | 'ngo' | 'private' | 'impact_investor';
  focusAreas: string[];
  minFunding: number;
  maxFunding: number;
  requirements: string[];
  applicationProcess: string;
  deadline: Date;
}

export interface Tender {
  id: string;
  title: string;
  organization: string;
  category: 'health' | 'agribusiness' | 'training' | 'capacity_building' | 'ai_products';
  description: string;
  requirements: string[];
  value: number;
  deadline: Date;
  documents: Document[];
}

export interface Match {
  id: string;
  type: 'job' | 'training' | 'funding' | 'tender' | 'project';
  sourceId: string;
  targetId: string;
  score: number;
  reasons: string[];
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  processed: boolean;
  extractedData: any;
  uploadedAt: Date;
}
