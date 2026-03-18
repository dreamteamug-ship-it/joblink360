import { encryptWithAES256, sendToCTODashboard } from '../security/encryption';

// FINANCE RECONCILIATION GATEWAY
// ACCESS LEVEL: CTO ONLY

export const CFO_RECONCILE = (data: Record<string, unknown>) => {
  const encryptedReport = encryptWithAES256(data, process.env.CTO_PRIVATE_KEY || 'default-key');
  sendToCTODashboard(encryptedReport);
  console.log("Finance packet secured. Sent to CTO Sande Allan.");
};
