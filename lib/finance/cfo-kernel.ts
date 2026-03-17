// FINANCE RECONCILIATION GATEWAY
// ACCESS LEVEL: CTO ONLY
export const CFO_RECONCILE = (data) => {
  const encryptedReport = encryptWithAES256(data, process.env.CTO_PRIVATE_KEY);
  sendToCTODashboard(encryptedReport);
  console.log("Finance packet secured. Sent to CTO Sande Allan.");
};
