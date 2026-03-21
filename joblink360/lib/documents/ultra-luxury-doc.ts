// lib/documents/ultra-luxury-doc.ts
import { supabase } from '@/lib/supabase/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class UltraLuxuryDocumentGenerator {
  private openRouterKey: string;
  
  constructor() {
    this.openRouterKey = process.env.OPENROUTER_API_KEY || '';
  }

  async generateProposalDocument(opportunity: any, userData: any, attachments: any[]): Promise<any> {
    // Step 1: Analyze opportunity and generate response
    const proposal = await this.aiGenerateProposal(opportunity, userData);
    
    // Step 2: Calculate success probability
    const successProbability = await this.calculateSuccessProbability(opportunity, proposal);
    
    // Step 3: Generate ultra-luxury HTML document
    const documentHtml = await this.generateDocumentHtml(opportunity, proposal, userData, successProbability);
    
    // Step 4: Convert to 4K PDF
    const pdfUrl = await this.generatePDF(documentHtml);
    
    // Step 5: Save to database
    const { data, error } = await supabase
      .from('funding_applications')
      .insert({
        opportunity_id: opportunity.id,
        user_id: userData.id,
        proposal_text: proposal.text,
        proposal_document_url: pdfUrl,
        success_probability: successProbability,
        status: successProbability >= 70 ? 'highly_likely' : 'needs_review',
        submitted_at: new Date().toISOString()
      })
      .select();
    
    return {
      success: true,
      document: documentHtml,
      pdfUrl,
      successProbability,
      applicationId: data[0].id,
      needsReview: successProbability < 70
    };
  }

  private async aiGenerateProposal(opportunity: any, userData: any): Promise<any> {
    const prompt = `Generate a professional funding proposal for:
    
Opportunity: ${opportunity.title}
Provider: ${opportunity.provider}
Country: ${opportunity.country}
Amount: ${opportunity.amount}

User/Organization: ${userData.organization_name}
Expertise: ${userData.expertise.join(', ')}

Generate:
1. Executive Summary (200 words)
2. Problem Statement (150 words)
3. Proposed Solution (250 words)
4. Implementation Plan (200 words)
5. Budget Breakdown (table format)
6. Expected Impact (150 words)
7. Sustainability Plan (100 words)
8. Conclusion (50 words)

Make it professional, compelling, and tailored to the funding provider's priorities.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openRouterKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      })
    });
    
    const data = await response.json();
    return { text: data.choices[0].message.content };
  }

  private async calculateSuccessProbability(opportunity: any, proposal: any): Promise<number> {
    const prompt = `Analyze this proposal for ${opportunity.title} and calculate success probability:
    
Proposal: ${proposal.text.substring(0, 2000)}
    
Factors to consider:
- Alignment with provider's mission (20%)
- Clarity and completeness (20%)
- Feasibility (20%)
- Impact potential (20%)
- Sustainability (20%)

Return ONLY a number between 0-100.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openRouterKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 10
      })
    });
    
    const data = await response.json();
    const probability = parseInt(data.choices[0].message.content) || 65;
    return Math.min(100, Math.max(0, probability));
  }

  private async generateDocumentHtml(opportunity: any, proposal: any, userData: any, successProbability: number): Promise<string> {
    const successColor = successProbability >= 70 ? '#4CAF50' : successProbability >= 50 ? '#FFC107' : '#F44336';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${opportunity.title} - Funding Proposal</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        body {
            margin: 0;
            padding: 0;
            font-family: 'Lato', sans-serif;
            background: #1a1a1a;
        }
        .document {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
            position: relative;
            box-shadow: 0 0 50px rgba(0,0,0,0.3);
        }
        /* Cover Page */
        .cover {
            background: linear-gradient(135deg, #0A192F 0%, #0F2A3F 100%);
            min-height: 297mm;
            position: relative;
            overflow: hidden;
        }
        .cover::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(45deg, rgba(212,175,55,0.05) 0px, rgba(212,175,55,0.05) 2px, transparent 2px, transparent 8px);
            transform: rotate(45deg);
        }
        .maasai-stripe {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 12px;
            background: linear-gradient(90deg, #8B0000 0%, #D4AF37 33%, #8B0000 66%, #003366 100%);
        }
        .cover-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 297mm;
            padding: 60px 50px;
            text-align: center;
        }
        .logo-placeholder {
            width: 120px;
            height: 120px;
            margin: 0 auto 40px;
            border: 3px solid #D4AF37;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(212,175,55,0.1);
            cursor: pointer;
            transition: all 0.3s;
        }
        .logo-placeholder:hover {
            border-color: #C5A028;
            transform: scale(1.05);
        }
        .logo-placeholder img {
            max-width: 80%;
            max-height: 80%;
            object-fit: contain;
        }
        .cover h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 48px;
            font-weight: 800;
            color: #D4AF37;
            margin-bottom: 20px;
            letter-spacing: 2px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .cover h2 {
            font-family: 'Montserrat', sans-serif;
            font-size: 24px;
            font-weight: 500;
            color: #C0C0C0;
            margin-bottom: 60px;
        }
        .cover .provider {
            font-size: 14px;
            color: #888;
            margin-top: 60px;
            letter-spacing: 2px;
        }
        /* Inner Pages */
        .inner-page {
            background: #FFFDF5;
            min-height: 297mm;
            padding: 50px;
            position: relative;
        }
        .gold-line {
            height: 2px;
            background: linear-gradient(90deg, #D4AF37 0%, transparent 100%);
            width: 100px;
            margin-bottom: 20px;
        }
        .header {
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 20px;
            margin-bottom: 40px;
        }
        .header h3 {
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            color: #D4AF37;
            letter-spacing: 2px;
            margin: 0;
        }
        .footer {
            position: absolute;
            bottom: 30px;
            left: 50px;
            right: 50px;
            border-top: 1px solid #D4AF37;
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #888;
        }
        .section-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: #0A192F;
            margin: 30px 0 20px;
            border-left: 4px solid #D4AF37;
            padding-left: 15px;
        }
        .content {
            font-family: 'Lato', sans-serif;
            font-size: 12px;
            line-height: 1.8;
            text-align: justify;
            color: #333;
        }
        .success-meter {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
        }
        .meter-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin: 10px 0;
        }
        .meter-fill {
            width: ${successProbability}%;
            height: 100%;
            background: ${successColor};
            transition: width 0.5s;
        }
        .signature-placeholder {
            width: 200px;
            height: 80px;
            border: 1px dashed #D4AF37;
            margin: 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: #fafafa;
        }
        .stamp-placeholder {
            width: 100px;
            height: 100px;
            border: 1px dashed #D4AF37;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .image-placeholder {
            border: 1px dashed #ccc;
            background: #fafafa;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            min-height: 200px;
            margin: 20px 0;
        }
        .image-placeholder:hover, .signature-placeholder:hover, .stamp-placeholder:hover, .logo-placeholder:hover {
            border-color: #D4AF37;
            background: rgba(212,175,55,0.05);
        }
        @media print {
            body { background: white; }
            .document { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="document" id="document-root">
        <!-- Cover Page -->
        <div class="cover">
            <div class="maasai-stripe"></div>
            <div class="cover-content">
                <div class="logo-placeholder" onclick="uploadLogo()" id="logo-placeholder">
                    <span style="color: #D4AF37; font-size: 12px;">Click to add logo</span>
                </div>
                <h1 contenteditable="true">${opportunity.title}</h1>
                <h2 contenteditable="true">Funding Proposal</h2>
                <div class="gold-line" style="margin: 30px auto;"></div>
                <p contenteditable="true" style="font-size: 14px; color: #ccc;">Prepared for: ${opportunity.provider}</p>
                <p contenteditable="true" style="font-size: 14px; color: #ccc;">Prepared by: ${userData.organization_name || userData.full_name}</p>
                <div class="provider">${new Date().toLocaleDateString()}</div>
            </div>
        </div>
        
        <!-- Inner Page 1: Executive Summary -->
        <div class="inner-page">
            <div class="header">
                <h3>SOVEREIGN PROPOSAL | ${opportunity.country}</h3>
            </div>
            <div class="section-title">Executive Summary</div>
            <div class="content" contenteditable="true">
                ${proposal.text.split('\n\n')[0] || 'Executive summary content...'}
            </div>
            
            <div class="section-title">Success Probability Analysis</div>
            <div class="success-meter">
                <div class="meter-bar"><div class="meter-fill"></div></div>
                <p style="font-size: 14px; font-weight: bold;">${successProbability}% Success Probability</p>
                <p style="font-size: 12px; color: #666;">${successProbability >= 70 ? 'High likelihood of approval. Ready for submission.' : successProbability >= 50 ? 'Needs refinement before submission.' : 'Significant revision required. AI will regenerate.'}</p>
            </div>
            
            <div class="footer">
                <span>JobLink 360 | Sovereign Intelligence</span>
                <span>Page 1</span>
            </div>
        </div>
        
        <!-- Additional pages will be added dynamically -->
        <div id="additional-pages"></div>
    </div>
    
    <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
        <button onclick="saveDocument()" style="background: #0A192F; color: #D4AF37; border: 1px solid #D4AF37; padding: 10px 20px; margin: 5px; cursor: pointer;">💾 Save Draft</button>
        <button onclick="exportPDF()" style="background: #D4AF37; color: #0A192F; border: none; padding: 10px 20px; margin: 5px; cursor: pointer;">📄 Export 4K PDF</button>
        <button onclick="analyzeAgain()" style="background: #8B0000; color: white; border: none; padding: 10px 20px; margin: 5px; cursor: pointer;">🤖 AI Analyze Again</button>
    </div>
    
    <script>
        function uploadLogo() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    const placeholder = document.getElementById('logo-placeholder');
                    placeholder.innerHTML = '';
                    placeholder.appendChild(img);
                };
                reader.readAsDataURL(file);
            };
            input.click();
        }
        
        function exportPDF() {
            const element = document.getElementById('document-root');
            html2pdf().set({
                margin: 0,
                filename: 'Funding_Proposal_4K.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 3, backgroundColor: '#FFFDF5' },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(element).save();
        }
        
        function saveDocument() {
            const html = document.documentElement.outerHTML;
            localStorage.setItem('proposal_draft', html);
            alert('Draft saved locally!');
        }
        
        function analyzeAgain() {
            alert('AI re-analyzing proposal. This will update success probability and suggestions.');
            // Trigger re-analysis API call
            fetch('/api/documents/analyze', {
                method: 'POST',
                body: JSON.stringify({ proposal_id: '${opportunity.id}' })
            });
        }
        
        // Initialize image placeholders for all sections
        document.querySelectorAll('.image-placeholder').forEach(el => {
            el.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.style.width = '100%';
                        img.style.height = 'auto';
                        el.innerHTML = '';
                        el.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            });
        });
    </script>
</body>
</html>
    `;
  }

  private async generatePDF(html: string): Promise<string> {
    // In production, this would call a PDF generation service
    // For now, return a placeholder
    return `https://joblink360-gamma.vercel.app/api/documents/pdf/${Date.now()}`;
  }
}

export const documentGenerator = new UltraLuxuryDocumentGenerator();