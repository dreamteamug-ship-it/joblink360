// lib/ai/agents/system.ts
import { deepseek } from '../../api/deepseek-client';
import { EAST_AFRICA_SADC_COUNTRIES, getCountryByCode } from '../../data/countries-config';
import { INTERNATIONAL_OPPORTUNITIES } from '../../data/international-config';

export class AgentSystem {
  async processRequest(message: string, userId: string = 'anonymous', country?: string, targetCountry?: string): Promise<any> {
    let contextPrompt = `You are Amanda, an AI career advisor for JobLink360.
    
You have expertise in:
- 26 African countries (East Africa + SADC)
- International opportunities in UAE, UK, Germany, USA, Canada, and Remote
- Job matching, CV optimization, funding, and visa guidance

User query: ${message}`;

    if (country) {
      const countryData = getCountryByCode(country);
      if (countryData) {
        contextPrompt += `\n\nUser is from ${countryData.name}. Consider local currency (${countryData.currency}), languages (${countryData.languages.join(", ")}), and cultural practices.`;
      }
    }

    if (targetCountry && INTERNATIONAL_OPPORTUNITIES[targetCountry]) {
      const intl = INTERNATIONAL_OPPORTUNITIES[targetCountry];
      contextPrompt += `\n\nUser is targeting ${targetCountry}. Key info:
- Visa options: ${intl.visaTypes.join(", ")}
- Popular sectors: ${intl.popularSectors.join(", ")}
- Average salary: ${intl.averageSalary}
- Cultural notes: ${intl.culturalNotes.join("; ")}`;
    }

    const response = await deepseek.chat([
      { role: 'system', content: contextPrompt },
      { role: 'user', content: message }
    ]);

    return {
      success: true,
      synthesis: response,
      country: country || 'regional',
      targetCountry: targetCountry || 'none',
      timestamp: new Date().toISOString()
    };
  }
}

export const agentSystem = new AgentSystem();
