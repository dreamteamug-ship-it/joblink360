import { jsPDF } from "jspdf";

interface InvoiceData {
  clientName: string;
  amount: number;
  currency: string;
  invoiceNumber: string;
  date: string;
  items?: Array<{ description: string; quantity: number; price: number }>;
}

export const generateTitaniumInvoice = (data: InvoiceData) => {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  // Luxury Design Theme: Maroon & Gold
  doc.setFillColor(139, 0, 0); // Titan Maroon
  doc.rect(0, 0, 297, 20, 'F');
  
  doc.setTextColor(212, 175, 55); // Gold
  doc.setFontSize(24);
  doc.text('TITANIUM INVOICE', 20, 15);
  
  // Add invoice details
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text(`Client: ${data.clientName}`, 20, 40);
  doc.text(`Amount: ${data.currency} ${data.amount}`, 20, 50);
  doc.text(`Invoice #: ${data.invoiceNumber}`, 20, 60);
  doc.text(`Date: ${data.date}`, 20, 70);

  return doc.output('datauristring');
};
