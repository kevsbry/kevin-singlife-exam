export const findClosestParkingSpace = (parkingDistances: number[]) => {
  return Math.min.apply(Math, parkingDistances);
};
