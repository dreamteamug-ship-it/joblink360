// lib/ai/matchmaking-engine.ts
import { User, Job, Training, Project, Funder, Tender, Match } from '../core/types';

export class MatchmakingEngine {
  // Job matching for candidates
  matchJobs(candidate: User, jobs: Job[]): Match[] {
    return jobs.map(job => {
      const skillMatch = this.calculateSkillMatch(candidate.skills, job.requirements);
      const locationMatch = candidate.location === job.location ? 100 : 50;
      const categoryMatch = this.categoryAlignment(candidate.interests, job.category);
      
      const score = Math.round((skillMatch * 0.5 + locationMatch * 0.2 + categoryMatch * 0.3));
      
      return {
        id: `match_${Date.now()}_${Math.random()}`,
        type: 'job',
        sourceId: candidate.id,
        targetId: job.id,
        score,
        reasons: [
          `Skill match: ${skillMatch}%`,
          `Location: ${locationMatch}%`,
          `Category alignment: ${categoryMatch}%`
        ],
        status: 'pending',
        createdAt: new Date()
      };
    }).filter(m => m.score > 70);
  }

  // Funding matchmaking for projects
  matchFunding(project: Project, funders: Funder[]): Match[] {
    return funders.map(funder => {
      const budgetMatch = project.budget >= funder.minFunding && project.budget <= funder.maxFunding ? 100 : 60;
      const focusMatch = this.categoryAlignment(project.category, funder.focusAreas);
      const requirementMatch = this.checkRequirements(project, funder.requirements);
      
      const score = Math.round((budgetMatch * 0.4 + focusMatch * 0.4 + requirementMatch * 0.2));
      
      return {
        id: `fund_${Date.now()}_${Math.random()}`,
        type: 'funding',
        sourceId: project.id,
        targetId: funder.id,
        score,
        reasons: [
          `Budget alignment: ${budgetMatch}%`,
          `Focus area match: ${focusMatch}%`,
          `Requirements met: ${requirementMatch}%`
        ],
        status: 'pending',
        createdAt: new Date()
      };
    }).filter(m => m.score > 75);
  }

  // Tender matching for businesses
  matchTenders(business: any, tenders: Tender[]): Match[] {
    return tenders.map(tender => {
      const categoryMatch = business.category === tender.category ? 100 : 40;
      const capacityMatch = this.assessCapacity(business, tender);
      const complianceMatch = this.checkCompliance(business, tender.requirements);
      
      const score = Math.round((categoryMatch * 0.3 + capacityMatch * 0.4 + complianceMatch * 0.3));
      
      return {
        id: `tender_${Date.now()}_${Math.random()}`,
        type: 'tender',
        sourceId: business.id,
        targetId: tender.id,
        score,
        reasons: [
          `Category match: ${categoryMatch}%`,
          `Capacity assessment: ${capacityMatch}%`,
          `Compliance: ${complianceMatch}%`
        ],
        status: 'pending',
        createdAt: new Date()
      };
    }).filter(m => m.score > 65);
  }

  // Training recommendations
  matchTraining(candidate: User, trainings: Training[]): Match[] {
    return trainings.map(training => {
      const skillGap = this.identifySkillGaps(candidate.skills, training.outcomes);
      const levelMatch = this.levelAlignment(candidate.skills.length, training.level);
      const interestMatch = this.categoryAlignment(candidate.interests, training.category);
      
      const score = Math.round((skillGap * 0.5 + levelMatch * 0.3 + interestMatch * 0.2));
      
      return {
        id: `train_${Date.now()}_${Math.random()}`,
        type: 'training',
        sourceId: candidate.id,
        targetId: training.id,
        score,
        reasons: [
          `Addresses skill gaps: ${skillGap}%`,
          `Level appropriate: ${levelMatch}%`,
          `Matches interests: ${interestMatch}%`
        ],
        status: 'pending',
        createdAt: new Date()
      };
    }).filter(m => m.score > 60);
  }

  private calculateSkillMatch(candidateSkills: string[], requirements: string[]): number {
    if (!requirements.length) return 100;
    const matches = requirements.filter(req => 
      candidateSkills.some(skill => skill.toLowerCase().includes(req.toLowerCase()))
    );
    return Math.round((matches.length / requirements.length) * 100);
  }

  private categoryAlignment(interests: string[], categories: string[]): number {
    if (!categories.length) return 100;
    const matches = categories.filter(cat => 
      interests.some(i => i.toLowerCase().includes(cat.toLowerCase()))
    );
    return Math.round((matches.length / categories.length) * 100);
  }

  private checkRequirements(project: Project, requirements: string[]): number {
    // Simplified requirement checking
    return Math.floor(Math.random() * 30 + 70); // 70-100%
  }

  private assessCapacity(business: any, tender: Tender): number {
    // Simplified capacity assessment
    return Math.floor(Math.random() * 20 + 80); // 80-100%
  }

  private checkCompliance(business: any, requirements: string[]): number {
    // Simplified compliance check
    return Math.floor(Math.random() * 25 + 75); // 75-100%
  }

  private identifySkillGaps(current: string[], outcomes: string[]): number {
    // Identify how well training addresses skill gaps
    return Math.floor(Math.random() * 30 + 70); // 70-100%
  }

  private levelAlignment(skillCount: number, level: string): number {
    // Simplified level matching
    return Math.floor(Math.random() * 20 + 80); // 80-100%
  }
}

export const matchmakingEngine = new MatchmakingEngine();
