// lib/ai/bridge.ts
export const createProjectSummary = (auditData: any) => {
  return `
  PROJECT SUMMARY: JOBLINK 360 AUDIT
  ----------------------------------
  CANDIDATE: ${auditData.name}
  STRENGTHS: ${auditData.strengths.join(', ')}
  WEAKNESSES: ${auditData.weaknesses.join(', ')}
  ASSIGNED COURSES: ${auditData.courses.join(', ')}
  AUDIT STATUS: VERIFIED BY AMANDA AI
  ----------------------------------
  READY FOR ULTRA-LUXURY CV GENERATION.
  `;
};