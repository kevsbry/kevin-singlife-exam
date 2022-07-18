import { Moment } from "moment";

export enum VehicleType {
  small,
  medium,
  large,
}

export type VehicleTypes =
  | VehicleType.small
  | VehicleType.medium
  | VehicleType.large;

export interface ParkingSpace {
  id: string;
  maxVehicleTypeCapacity:
    | VehicleType.small
    | VehicleType.medium
    | VehicleType.large;
  dateTimeOccupied: Moment | null;
}
