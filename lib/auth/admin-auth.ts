// lib/auth/admin-auth.ts
export class AdminAuth {
  private readonly ADMIN_EMAIL = 'sande.allan@dreamteamconsult.net';
  private readonly ADMIN_ID = 'CIO-SANDE-001';
  private readonly ADMIN_PASSWORD = 'Titanium2026!';

  async validateAdmin(email: string, password: string): Promise<boolean> {
    const validEmail = email === this.ADMIN_EMAIL;
    const validPassword = password === this.ADMIN_PASSWORD;
    return validEmail && validPassword;
  }

  async generateToken(adminId: string): Promise<string> {
    const token = Buffer.from(`${adminId}:${Date.now()}`).toString('base64');
    return token;
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      return decoded.includes('CIO-SANDE-001');
    } catch {
      return false;
    }
  }
}

export const adminAuth = new AdminAuth();