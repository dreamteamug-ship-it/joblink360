import crypto from 'crypto';

export function encryptWithAES256(data: any, key: string): string {
  // Modern AES-256 encryption using createCipheriv
  const jsonString = JSON.stringify(data);
  
  // Create a fixed IV (in production, use a random IV and store it)
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', crypto.createHash('sha256').update(key).digest(), iv);
  
  let encrypted = cipher.update(jsonString, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Return IV + encrypted data (IV is needed for decryption)
  return iv.toString('hex') + ':' + encrypted;
}

export function sendToCTODashboard(data: string): void {
  // Placeholder for dashboard integration
  console.log('Sending to CTO dashboard:', data.substring(0, 50) + '...');
}
