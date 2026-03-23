// lib/titanium/client.ts
import { TITANIUM_CONFIG } from './config';

export interface TitaniumRecord {
  id: number;
  name: string;
  description?: string;
  [key: string]: any;
}

export class TitaniumClient {
  private url: string;
  private db: string;
  private uid: number;
  private apiKey: string;
  
  constructor() {
    this.url = TITANIUM_CONFIG.erp.url;
    this.db = TITANIUM_CONFIG.erp.db;
    this.uid = TITANIUM_CONFIG.erp.uid;
    this.apiKey = TITANIUM_CONFIG.erp.apiKey;
  }
  
  private async xmlrpcCall(model: string, method: string, args: any[] = []): Promise<any> {
    const xmlrpcUrl = `${this.url}/xmlrpc/2/object`;
    
    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          this.db,
          this.uid,
          this.apiKey,
          model,
          method,
          args
        ]
      },
      id: Date.now()
    };
    
    try {
      const response = await fetch(xmlrpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.result;
    } catch (error) {
      console.error('Titanium API error:', error);
      return null;
    }
  }
  
  // =====================================================
  // FINANCE MODULES
  // =====================================================
  
  async getInvoices(limit: number = 20): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('account.move', 'search_read', [
      [['type', '=', 'out_invoice']],
      ['name', 'partner_id', 'invoice_date', 'amount_total', 'state'],
      limit
    ]);
  }
  
  async createInvoice(data: any): Promise<number> {
    return await this.xmlrpcCall('account.move', 'create', [data]);
  }
  
  async getExpenses(limit: number = 20): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('hr.expense', 'search_read', [
      [],
      ['name', 'employee_id', 'total_amount', 'state'],
      limit
    ]);
  }
  
  // =====================================================
  // SALES & CRM MODULES
  // =====================================================
  
  async getLeads(limit: number = 20): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('crm.lead', 'search_read', [
      [],
      ['name', 'partner_id', 'expected_revenue', 'stage_id', 'priority'],
      limit
    ]);
  }
  
  async createLead(data: any): Promise<number> {
    return await this.xmlrpcCall('crm.lead', 'create', [data]);
  }
  
  async getSalesOrders(limit: number = 20): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('sale.order', 'search_read', [
      [],
      ['name', 'partner_id', 'amount_total', 'state'],
      limit
    ]);
  }
  
  // =====================================================
  // SUPPLY CHAIN MODULES
  // =====================================================
  
  async getProducts(limit: number = 50): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('product.product', 'search_read', [
      [],
      ['name', 'list_price', 'qty_available', 'categ_id'],
      limit
    ]);
  }
  
  async getInventory(limit: number = 50): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('stock.quant', 'search_read', [
      [],
      ['product_id', 'location_id', 'quantity', 'reserved_quantity'],
      limit
    ]);
  }
  
  async getManufacturingOrders(limit: number = 20): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('mrp.production', 'search_read', [
      [],
      ['name', 'product_id', 'product_qty', 'state'],
      limit
    ]);
  }
  
  // =====================================================
  // HR MODULES
  // =====================================================
  
  async getEmployees(limit: number = 50): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('hr.employee', 'search_read', [
      [],
      ['name', 'job_id', 'department_id', 'work_email'],
      limit
    ]);
  }
  
  async getJobs(limit: number = 20): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('hr.job', 'search_read', [
      [],
      ['name', 'department_id', 'no_of_recruitment'],
      limit
    ]);
  }
  
  async getFleetVehicles(limit: number = 50): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('fleet.vehicle', 'search_read', [
      [],
      ['name', 'model_id', 'driver_id', 'odometer'],
      limit
    ]);
  }
  
  // =====================================================
  // LOGISTICS MODULES
  // =====================================================
  
  async getDeliveries(limit: number = 20): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('stock.picking', 'search_read', [
      [['picking_type_id', '=', 1]],
      ['name', 'partner_id', 'scheduled_date', 'state'],
      limit
    ]);
  }
  
  async getLoriMatches(limit: number = 20): Promise<TitaniumRecord[]> {
    // Custom Lori Matchmaker data from Supabase
    const response = await fetch('/api/lori/matches');
    return await response.json();
  }
  
  // =====================================================
  // E-COMMERCE MODULES
  // =====================================================
  
  async getOrders(limit: number = 20): Promise<TitaniumRecord[]> {
    return await this.xmlrpcCall('sale.order', 'search_read', [
      [],
      ['name', 'partner_id', 'amount_total', 'state'],
      limit
    ]);
  }
  
  // =====================================================
  // EDUCATION MODULES
  // =====================================================
  
  async getCourses(limit: number = 20): Promise<TitaniumRecord[]> {
    const response = await fetch('/api/courses');
    return await response.json();
  }
  
  async getEnrollments(userId: string): Promise<TitaniumRecord[]> {
    const response = await fetch(`/api/enrollments?user_id=${userId}`);
    return await response.json();
  }
}

export const titanium = new TitaniumClient();
