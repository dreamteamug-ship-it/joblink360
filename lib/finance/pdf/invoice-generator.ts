import { jsPDF } from "jspdf";

export const generateTitaniumInvoice = (data) => {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  
  // Luxury Design Theme: Maroon & Gold
  doc.setFillColor(128, 0, 0); // Maroon
  doc.rect(0, 0, 297, 20, 'F');
  
  doc.setTextColor(255, 215, 0); // Gold
  doc.setFontSize(22);
  doc.text("TITANIUM ENTERPRISE INVOICE", 10, 14);
  
  // Content Body
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Transaction ID: ${data.id}`, 10, 40);
  doc.text(`Date: ${new Date().toLocaleString()}`, 10, 50);
  doc.text(`Client ID: ${data.userId}`, 10, 60);
  
  // Multi-Currency Precision Row
  doc.setFont("helvetica", "bold");
  doc.text(`Amount (KES): ${data.amountKES.toLocaleString()}`, 10, 80);
  doc.text(`Amount (${data.targetCurrency}): ${data.convertedAmount.toFixed(2)}`, 10, 90);
  
  // Watermark for Authenticity
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(60);
  doc.text("TITANIUM SECURE", 50, 150, { angle: 45 });
  
  doc.save(`Invoice_${data.id}.pdf`);
  console.log("√ Luxury Invoice Generated and Saved locally.");
};
