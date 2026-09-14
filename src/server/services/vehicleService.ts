import { VehicleModel, IVehicle } from '../models/Vehicle.ts';
import { inMemoryDB, InMemoryVehicle } from '../db/inMemoryStore.ts';
import { isDbConnected } from '../db/connection.ts';

export class VehicleService {
  async getAllVehicles(category?: string) {
    if (isDbConnected()) {
      const query: any = { isAvailable: true };
      if (category && category !== 'all') {
        query.category = new RegExp(category, 'i');
      }
      return await VehicleModel.find(query).sort({ startingPrice: 1 });
    } else {
      let list = inMemoryDB.vehicles.filter((v) => v.isAvailable);
      if (category && category !== 'all') {
        list = list.filter((v) => v.category.toLowerCase().includes(category.toLowerCase()));
      }
      return list;
    }
  }

  async getVehicleById(idOrModelCode: string) {
    const search = idOrModelCode.toUpperCase();

    if (isDbConnected()) {
      const vehicle = await VehicleModel.findOne({
        $or: [
          { modelCode: search },
          { name: new RegExp(`^${idOrModelCode}$`, 'i') },
        ],
      });
      return vehicle;
    } else {
      return inMemoryDB.vehicles.find(
        (v) =>
          v.id.toLowerCase() === idOrModelCode.toLowerCase() ||
          v.modelCode.toUpperCase() === search ||
          v.name.toLowerCase() === idOrModelCode.toLowerCase()
      );
    }
  }

  async compareVehicles(modelCode1: string, modelCode2: string) {
    const v1 = await this.getVehicleById(modelCode1);
    const v2 = await this.getVehicleById(modelCode2);

    if (!v1 || !v2) {
      throw { statusCode: 404, message: 'One or both vehicles for comparison not found.' };
    }

    return { vehicleA: v1, vehicleB: v2 };
  }
}

export const vehicleService = new VehicleService();
