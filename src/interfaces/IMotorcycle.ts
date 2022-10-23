import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const categoryCar = ['Street', 'Custom', 'Trail'] as const;

const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(categoryCar),
  engineCapacity: z.number().int().min(0).max(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export {
  MotorcycleZodSchema, 
  IMotorcycle,
  categoryCar,
};