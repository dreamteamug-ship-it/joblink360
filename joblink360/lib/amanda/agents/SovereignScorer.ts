export const calculateSovereignScore = (candidateData: any) => {
  const base = 70; 
  const aiBonus = candidateData.hasAISkills ? 25 : 0;
  return Math.min(base + aiBonus, 100);
};
