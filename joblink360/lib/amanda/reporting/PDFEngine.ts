import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateSovereignPDF = (data: any, type: string) => {
  const doc = new jsPDF();
  const gold = [212, 175, 55];
  const deepBlue = [5, 11, 20];

  // Header - Ultra Luxury Branding
  doc.setFillColor(deepBlue[0], deepBlue[1], deepBlue[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFontSize(22);
  doc.text('DREAMTEQ SOVEREIGN ECOSYSTEM', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(`${type} BRIEFING | CTO: MR. ALLAN`, 105, 30, { align: 'center' });

  // Body Data Mapping
  doc.setTextColor(deepBlue[0], deepBlue[1], deepBlue[2]);
  doc.setFontSize(14);
  doc.text('Ecosystem Performance Matrix', 14, 50);

  // @ts-ignore - jspdf-autotable integration
  doc.autoTable({
    startY: 60,
    head: [['Subsidiary', 'Automation %', 'Status', 'Revenue Impact']],
    body: [
      ['JobLinks Africa', '94%', 'Optimal', 'High'],
      ['Altovex Global', '88%', 'Active', 'Moderate'],
      ['DreamTeQ 360', '91%', 'Scaling', 'Critical'],
      ['SinoAfric EV', '72%', 'Monitoring', 'Emerging']
    ],
    headStyles: { fillColor: deepBlue },
    alternateRowStyles: { fillColor: [250, 245, 230] } // Matte Cream
  });

  return doc.output('blob');
};
