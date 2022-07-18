import { ParkingSpace } from "../typings/parking-space";

export const getClosestParkingSpaceIndex = ({
  parkingSpaces,
  vehicleSize,
  entryPoints,
  selectedEntryPoint,
}: {
  parkingSpaces: ParkingSpace[];
  vehicleSize: number;
  entryPoints: number[][];
  selectedEntryPoint: number;
}): number | null => {
  let closestParkingSpace = null;

  const parkingSpacesDistances = entryPoints[selectedEntryPoint];

  const sortedParkingSpaces = parkingSpacesDistances
    .map((distance, i) => ({
      index: i,
      distance,
    }))
    .sort((a, b) => a.distance - b.distance);

  for (let i = 0; i < sortedParkingSpaces.length; i++) {
    const currentClosest = sortedParkingSpaces[i].index;

    if (parkingSpaces[currentClosest] === undefined) {
      continue;
    }

    if (
      vehicleSize <= parkingSpaces[currentClosest].maxVehicleTypeCapacity &&
      parkingSpaces[currentClosest].dateTimeOccupied === null
    ) {
      closestParkingSpace = sortedParkingSpaces[i].index;
      break;
    }
  }

  return closestParkingSpace;
};
