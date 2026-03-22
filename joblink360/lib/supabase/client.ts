// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Course = {
    id: string;
    title: string;
    slug: string;
    description: string;
    level: string;
    duration_hours: number;
    price: number;
    is_published: boolean;
    featured: boolean;
    enrollment_count: number;
    rating: number;
};

export type Enrollment = {
    id: string;
    user_id: string;
    course_id: string;
    enrolled_at: string;
    progress_percent: number;
    certificate_issued: boolean;
};

export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    job_type: string;
    description: string;
    salary_min: number;
    salary_max: number;
    currency: string;
    source_url: string;
};

export type FundingOpportunity = {
    id: string;
    title: string;
    donor: string;
    amount: string;
    deadline: string;
    country: string[];
    category: string;
    description: string;
    source_url: string;
    probability: string;
};
