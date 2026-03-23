export const calculateSovereignScore = (cvData: any, requirementMatch: number) => {
  const aiWeight = 0.4;
  const experienceWeight = 0.6;
  
  const score = (cvData.skillsMatch * aiWeight) + (requirementMatch * experienceWeight);
  return Math.min(Math.round(score), 100);
};
