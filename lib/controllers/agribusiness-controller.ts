// lib/controllers/agribusiness-controller.ts
import { Yield, Farmer, Inventory, Dispatch } from '../database/schema';

export class AgribusinessController {
  private farmers: Map<string, Farmer> = new Map();
  private yields: Yield[] = [];
  private dispatches: Dispatch[] = [];

  // POST /log-yield: Records tonnage, crop type, and Farmer ID
  async logYield(yieldData: any): Promise<any> {
    console.log(`🌾 Logging yield for Farmer: ${yieldData.farmerId}`);
    
    const newYield: Yield = {
      id: `YLD-${Date.now()}`,
      farmerId: yieldData.farmerId,
      cropType: yieldData.cropType,
      quantity: yieldData.quantity,
      quality: yieldData.quality || 'A',
      status: 'recorded',
      recordedAt: new Date()
    };

    this.yields.push(newYield);

    // Update inventory
    const inventory = await this.getInventoryAudit();

    return {
      success: true,
      yield: newYield,
      inventory,
      message: `✅ ${yieldData.quantity} tons of ${yieldData.cropType} recorded`
    };
  }

  // GET /inventory-audit: Real-time Metric Tons in warehouses
  async getInventoryAudit(): Promise<Inventory[]> {
    const inventory: Inventory[] = [];
    const cropTypes = ['Soybeans', 'Maize', 'Avocado'];
    const warehouses = ['Mityana', 'Nairobi', 'Kisumu'];

    for (const crop of cropTypes) {
      for (const warehouse of warehouses) {
        const totalTons = this.yields
          .filter(y => y.cropType === crop && y.status === 'recorded')
          .reduce((sum, y) => sum + y.quantity, 0);

        inventory.push({
          cropType: crop,
          totalTons,
          warehouse,
          value: totalTons * 50000, // KES 50,000 per ton
          lastUpdated: new Date()
        });
      }
    }

    return inventory;
  }

  // PUT /update-dispatch: Shifts cargo status
  async updateDispatch(dispatchId: string, newStatus: string): Promise<any> {
    console.log(`🚚 Updating dispatch ${dispatchId} to ${newStatus}`);
    
    const dispatch = this.dispatches.find(d => d.id === dispatchId);
    if (!dispatch) {
      throw new Error('Dispatch not found');
    }

    dispatch.status = newStatus as any;
    
    if (newStatus === 'at-hub') {
      dispatch.actualArrival = new Date();
    }

    return {
      success: true,
      dispatch,
      message: `✅ Dispatch ${dispatchId} now ${newStatus}`
    };
  }

  // Create new dispatch
  async createDispatch(dispatchData: any): Promise<any> {
    const dispatch: Dispatch = {
      id: `DSP-${Date.now()}`,
      dispatchId: `DSP-${Date.now()}`,
      farmerId: dispatchData.farmerId,
      driverId: dispatchData.driverId,
      cropType: dispatchData.cropType,
      quantity: dispatchData.quantity,
      origin: dispatchData.origin,
      destination: dispatchData.destination,
      status: 'at-farm',
      estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000),
      route: [dispatchData.origin, dispatchData.destination],
      createdAt: new Date()
    };

    this.dispatches.push(dispatch);
    return dispatch;
  }
}