type VehicleType = 'bus' | 'car' | 'moto' | 'bicycle' | 'boat';
type Fuel = 'diesel' | 'petrol' | 'electric';

interface Bicycle {
  type: 'bicycle';
}

interface Car {
  fuel: Fuel;
  type: 'car';
}

interface Moto {
  fuel: Fuel;
  type: 'moto';
}

interface Bus {
  capacity: number;
  isPublicTransport: boolean;
  type: 'bus';
}

interface Boat {
  capacity: number;
  fuel: Fuel;
  type: 'boat';
}

type Vehicle = Bicycle | Car | Moto | Bus | Boat;

// OVERLOAD FUNCTIONS
export function createVehicle(type: VehicleType): Bicycle;
export function createVehicle(type: VehicleType, fuel: Fuel): Car;
export function createVehicle(type: VehicleType, fuel: Fuel): Moto;
export function createVehicle(
  type: VehicleType,
  fuel: Fuel,
  capacity: number,
  isPublicTransport: boolean,
): Bus;
export function createVehicle(
  type: VehicleType,
  fuel: Fuel,
  capacity: number,
): Boat;

export function createVehicle(
  type: VehicleType,
  fuel?: Fuel,
  capacity?: number,
  isPublicTransport?: boolean,
): Vehicle {
  switch (type) {
    case 'bicycle':
      return { type };
    case 'car':
    case 'moto':
      if (!fuel) throw new Error(`fuel property is missing for type ${type}`);
      return { fuel, type };
    case 'boat':
      if (!capacity)
        throw new Error(`capacity property is missing for type boat`);
      if (!fuel) throw new Error(`Fuel property is missing for type boat`);
      return { capacity, fuel, type };
    case 'bus':
      if (!capacity)
        throw new Error(`capacity property is missing for type bus`);
      if (!isPublicTransport)
        throw new Error(`isPublicTransport property is missing for type bus`);
      return { capacity, isPublicTransport, type };
    default:
      throw new Error(`Unknown vehicle type: ${type}`);
  }
}
