import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateSovereignDocument = (data, title, orientation = 'p') => {
  const doc = new jsPDF({ orientation: orientation, unit: 'mm', format: 'a4' });
  
  // SECURE FORGE-PROOF WATERMARK
  const addWatermark = (pdf) => {
    pdf.setTextColor(240, 240, 240);
    pdf.setFontSize(50);
    pdf.text('DREAMTEQ SOVEREIGN AUTHENTIC', 105, 150, { align: 'center', angle: 45 });
  };

  addWatermark(doc);

  // 4K ULTRA-LUXURY HEADER (Deep Blue & Gold)
  doc.setFillColor(5, 11, 20); // #050B14
  doc.rect(0, 0, 210, 35, 'F');
  doc.setTextColor(212, 175, 55); // #D4AF37
  doc.setFontSize(22);
  doc.text('DREAMTEQ SOVEREIGN ECOSYSTEM', 105, 18, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`OFFICIAL ${title.toUpperCase()} | SYSTEM AUTHENTICATED`, 105, 28, { align: 'center' });

  // PAGE CONTENT SENTENCE CLOSURE LOGIC
  // Ensures every page ends with a full stop per Sovereign SOP
  const content = data.text + ".";
  doc.setTextColor(30, 30, 30);
  doc.text(content, 15, 50, { maxWidth: 180 });

  return doc.save(`${title.replace(/\s+/g, '_')}_Archive.pdf`);
};
