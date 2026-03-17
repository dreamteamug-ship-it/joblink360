// lib/ai/agents/system.ts (add to existing file)
// Add this function to the AgentSystem class

  async getInternationalAdvice(message: string, targetCountry: string): Promise<any> {
    const countryData = INTERNATIONAL_OPPORTUNITIES[targetCountry];
    
    if (!countryData) {
      return {
        success: false,
        message: `Country ${targetCountry} not found in international database`
      };
    }

    const prompt = `
You are Amanda, advising a job seeker from East Africa about opportunities in ${targetCountry}.

Country Information:
- Region: ${countryData.region}
- Major Cities: ${countryData.countries.join(', ')}
- Popular Job Portals: ${countryData.jobPortals.join(', ')}
- Visa Options: ${countryData.visaTypes.join(', ')}
- Language Requirements: ${countryData.languageRequirements.join(', ')}
- Popular Sectors: ${countryData.popularSectors.join(', ')}
- Average Salary: ${countryData.averageSalary}
- Cultural Notes: ${countryData.culturalNotes.join('. ')}

User Query: ${message}

Provide practical, actionable advice including:
1. Visa pathways and requirements
2. Job search strategies specific to this country
3. Cultural adaptation tips
4. Salary expectations and cost of living
5. Language preparation needed
6. Recognition of East African qualifications
    `;

    const response = await deepseek.chat([
      { role: 'system', content: 'You are Amanda, an international career advisor for East African professionals.' },
      { role: 'user', content: prompt }
    ]);

    return {
      success: true,
      country: targetCountry,
      countryData,
      advice: response.choices[0].message.content,
      timestamp: new Date().toISOString()
    };
  }
