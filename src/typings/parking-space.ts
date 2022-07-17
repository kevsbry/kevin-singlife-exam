export enum VehicleType {
  small,
  medium,
  large,
}

export interface ParkingSpace {
  maxVehicleTypeCapacity:
    | VehicleType.small
    | VehicleType.medium
    | VehicleType.large;
  available: boolean;
}
