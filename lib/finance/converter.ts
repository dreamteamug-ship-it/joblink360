export const fetchLiveRates = async () => {
  // Precision polling every 60 seconds
  const response = await fetch('https://api.titanium.com/rates/v1?base=KES');
  return await response.json(); 
};
