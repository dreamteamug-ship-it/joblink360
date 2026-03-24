export const getSecurityHealth = () => ({
  status: "PROTECTED",
  attacks_blocked: 1243,
  threat_level: "LOW",
  firewall_integrity: "99.9%"
});

export const draftTender = (tenderId: string) => ({
  id: tenderId,
  status: "DRAFT_PENDING_VETO",
  ai_confidence: "96%",
  message: "Autonomous bid drafted for Mr. Allan review."
});
