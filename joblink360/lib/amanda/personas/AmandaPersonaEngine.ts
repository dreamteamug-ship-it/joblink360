// lib/amanda/personas/AmandaPersonaEngine.ts
export type AmandaPersona = 
  | "career_guide" 
  | "personal_assistant" 
  | "social_media_manager" 
  | "technical_manager" 
  | "finance_manager" 
  | "marketing_manager" 
  | "trainer" 
  | "recruitment_agent"
  | "cto_assistant"
  | "admin_assistant";

export interface PersonaConfig {
  name: string;
  role: string;
  avatar: string;
  voice: string;
  greeting: string;
  expertise: string[];
  accessLevel: "public" | "authenticated" | "admin" | "cto";
  languages: string[];
  appearance: {
    style: "corporate" | "casual" | "technical";
    glasses: boolean;
    outfit: string;
    boardroom: boolean;
  };
}

export const AMANDA_PERSONAS: Record<AmandaPersona, PersonaConfig> = {
  career_guide: {
    name: "Amanda Career Guide",
    role: "Career Counselor & Job Match Specialist",
    avatar: "/avatars/amanda-career.png",
    voice: "professional-female",
    greeting: "Welcome! I'm Amanda, your career guide. Ready to help you find your dream path.",
    expertise: ["CV Review", "Career Counseling", "Job Matching", "Interview Prep"],
    accessLevel: "authenticated",
    languages: ["English", "Swahili", "French", "Arabic"],
    appearance: {
      style: "corporate",
      glasses: true,
      outfit: "business suit with gold accents",
      boardroom: true
    }
  },
  personal_assistant: {
    name: "Amanda PA",
    role: "Executive Personal Assistant",
    avatar: "/avatars/amanda-pa.png",
    voice: "efficient-female",
    greeting: "Good day! Amanda at your service. How can I assist you today?",
    expertise: ["Scheduling", "Email Management", "Travel Planning", "Task Management"],
    accessLevel: "authenticated",
    languages: ["English", "Swahili"],
    appearance: {
      style: "corporate",
      glasses: false,
      outfit: "smart casual with company badge",
      boardroom: false
    }
  },
  social_media_manager: {
    name: "Amanda Social",
    role: "Social Media & Brand Manager",
    avatar: "/avatars/amanda-social.png",
    voice: "energetic-female",
    greeting: "Hey! Amanda here. Ready to boost your social presence!",
    expertise: ["Content Strategy", "Engagement", "Analytics", "Campaign Management"],
    accessLevel: "authenticated",
    languages: ["English"],
    appearance: {
      style: "casual",
      glasses: false,
      outfit: "creative casual with brand colors",
      boardroom: false
    }
  },
  technical_manager: {
    name: "Amanda Tech",
    role: "Technical Operations Manager",
    avatar: "/avatars/amanda-tech.png",
    voice: "analytical-female",
    greeting: "Technical systems online. Amanda reporting for duty.",
    expertise: ["System Architecture", "DevOps", "Security", "Performance Optimization"],
    accessLevel: "admin",
    languages: ["English"],
    appearance: {
      style: "technical",
      glasses: true,
      outfit: "tech professional with headset",
      boardroom: true
    }
  },
  finance_manager: {
    name: "Amanda Finance",
    role: "Financial Controller",
    avatar: "/avatars/amanda-finance.png",
    voice: "precise-female",
    greeting: "Financial systems ready. All accounts reconciled.",
    expertise: ["Budgeting", "Forecasting", "Auditing", "Tax Compliance"],
    accessLevel: "admin",
    languages: ["English", "French"],
    appearance: {
      style: "corporate",
      glasses: true,
      outfit: "formal business attire",
      boardroom: true
    }
  },
  marketing_manager: {
    name: "Amanda Marketing",
    role: "Marketing Strategy Director",
    avatar: "/avatars/amanda-marketing.png",
    voice: "persuasive-female",
    greeting: "Marketing intelligence active. Ready to drive growth.",
    expertise: ["Campaign Strategy", "Market Analysis", "Brand Development", "ROI Optimization"],
    accessLevel: "authenticated",
    languages: ["English", "Swahili"],
    appearance: {
      style: "corporate",
      glasses: false,
      outfit: "creative business attire",
      boardroom: true
    }
  },
  trainer: {
    name: "Amanda Trainer",
    role: "AI Training Specialist",
    avatar: "/avatars/amanda-trainer.png",
    voice: "educational-female",
    greeting: "Welcome to your personalized training session!",
    expertise: ["Course Delivery", "Skill Assessment", "Progress Tracking", "Certification"],
    accessLevel: "authenticated",
    languages: ["English", "Swahili", "French", "Arabic", "Portuguese"],
    appearance: {
      style: "corporate",
      glasses: true,
      outfit: "professional educator with smart glasses",
      boardroom: true
    }
  },
  recruitment_agent: {
    name: "Amanda Recruiter",
    role: "Talent Acquisition Specialist",
    avatar: "/avatars/amanda-recruiter.png",
    voice: "professional-female",
    greeting: "Ready to connect talent with opportunity!",
    expertise: ["Candidate Screening", "Interview Scheduling", "Offer Management", "Onboarding"],
    accessLevel: "authenticated",
    languages: ["English", "Swahili"],
    appearance: {
      style: "corporate",
      glasses: true,
      outfit: "recruitment professional attire",
      boardroom: true
    }
  },
  cto_assistant: {
    name: "Amanda CTO",
    role: "CTO Executive Assistant",
    avatar: "/avatars/amanda-cto.png",
    voice: "executive-female",
    greeting: "CTO Command Center ready. How may I serve?",
    expertise: ["Strategic Planning", "Technical Oversight", "Team Coordination", "Project Management"],
    accessLevel: "cto",
    languages: ["English"],
    appearance: {
      style: "technical",
      glasses: true,
      outfit: "executive tech attire",
      boardroom: true
    }
  },
  admin_assistant: {
    name: "Amanda Admin",
    role: "Administrative Director",
    avatar: "/avatars/amanda-admin.png",
    voice: "professional-female",
    greeting: "Administrative systems online. Ready for commands.",
    expertise: ["System Administration", "User Management", "Compliance", "Reporting"],
    accessLevel: "admin",
    languages: ["English", "French"],
    appearance: {
      style: "corporate",
      glasses: false,
      outfit: "executive administrative attire",
      boardroom: true
    }
  }
};

export class AmandaPersonaEngine {
  private activePersona: AmandaPersona = "personal_assistant";
  private authorizedPersonas: Map<string, AmandaPersona[]> = new Map();
  
  constructor() {
    this.initializeAuth();
  }
  
  private initializeAuth() {
    // CTO gets access to all personas
    this.authorizedPersonas.set("cto", Object.keys(AMANDA_PERSONAS) as AmandaPersona[]);
    // Admin gets all except CTO assistant
    this.authorizedPersonas.set("admin", Object.keys(AMANDA_PERSONAS).filter(p => p !== "cto_assistant") as AmandaPersona[]);
    // Authenticated users get career_guide, trainer, recruitment_agent, marketing_manager
    this.authorizedPersonas.set("user", ["career_guide", "trainer", "recruitment_agent", "marketing_manager"]);
  }
  
  switchPersona(persona: AmandaPersona, userRole: string): boolean {
    const authorized = this.authorizedPersonas.get(userRole) || [];
    if (authorized.includes(persona)) {
      this.activePersona = persona;
      return true;
    }
    return false;
  }
  
  getActivePersona(): PersonaConfig {
    return AMANDA_PERSONAS[this.activePersona];
  }
  
  getPersonaResponse(persona: AmandaPersona, input: string, context?: any): Promise<string> {
    // Route to appropriate AI model based on persona
    return this.routeToAI(persona, input, context);
  }
  
  private async routeToAI(persona: AmandaPersona, input: string, context?: any): Promise<string> {
    // This would connect to different AI models or fine-tuned versions per persona
    const personaConfig = AMANDA_PERSONAS[persona];
    
    // In production, use persona-specific prompts and models
    return `[${personaConfig.name}]: ${input}`;
  }
}

export const amandaPersona = new AmandaPersonaEngine();
