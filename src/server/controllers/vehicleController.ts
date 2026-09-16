import { Request, Response, NextFunction } from 'express';
import { vehicleService } from '../services/vehicleService.ts';

export class VehicleController {
  async getVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string | undefined;
      const vehicles = await vehicleService.getAllVehicles(category);
      res.status(200).json({
        success: true,
        count: vehicles.length,
        data: vehicles,
      });
    } catch (err) {
      next(err);
    }
  }

  async getVehicleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const vehicle = await vehicleService.getVehicleById(id);
      if (!vehicle) {
        res.status(404).json({
          success: false,
          error: { message: `Vehicle '${id}' not found in catalog.` },
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: vehicle,
      });
    } catch (err) {
      next(err);
    }
  }

  async compare(req: Request, res: Response, next: NextFunction) {
    try {
      const { v1, v2 } = req.query;
      if (!v1 || !v2) {
        res.status(400).json({
          success: false,
          message: 'Both v1 and v2 model codes are required for comparison.',
        });
        return;
      }
      const comparison = await vehicleService.compareVehicles(String(v1), String(v2));
      res.status(200).json({
        success: true,
        data: comparison,
      });
    } catch (err) {
      next(err);
    }
  }

  async proxyImage(req: Request, res: Response, next: NextFunction) {
    try {
      const url = req.query.url as string;
      if (!url || (!url.startsWith('https://www.nissan.in') && !url.startsWith('https://libs-asia.nissan-cdn.net'))) {
        res.status(400).json({ success: false, message: 'Valid Nissan image URL required' });
        return;
      }
      const response = await fetch(url);
      if (!response.ok) {
        res.status(response.status).json({ success: false, message: 'Failed to fetch image' });
        return;
      }
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const buffer = await response.arrayBuffer();
      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(Buffer.from(buffer));
    } catch (err) {
      next(err);
    }
  }
}

export const vehicleController = new VehicleController();
