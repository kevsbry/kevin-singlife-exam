import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParkingSpace, VehicleType } from "../typings/parking-space";

const initialState: {
  currentClosestParkingSpace: number | null; // parking space index
  entryPoints: number[][]; // [entryPoint index][...parking spaces distance]
  parkingSpaces: ParkingSpace[];
} = {
  currentClosestParkingSpace: null,
  entryPoints: [],
  parkingSpaces: [],
};

const entryPointsSlice = createSlice({
  name: "entry-points",
  initialState,
  reducers: {
    generateParkingSpaces: (
      state,
      action: PayloadAction<{ parkingSpaceQty: number }>
    ) => {
      state.parkingSpaces = [];
      const { parkingSpaceQty } = action.payload;

      for (let i = 0; i < parkingSpaceQty; i++) {
        state.parkingSpaces.push({
          id: String(i),
          dateTimeOccupied: null,
          maxVehicleTypeCapacity: Math.floor(Math.random() * 3),
        });
      }
    },

    generateInitialEntryPoints: (
      state,
      action: PayloadAction<{
        parkingSpaces: ParkingSpace[];
        entryPointsQty: number;
      }>
    ) => {
      const { parkingSpaces, entryPointsQty } = action.payload;

      for (let i = 0; i < entryPointsQty; i++) {
        parkingSpaces.forEach(() => {
          const randomDistance = Math.floor(Math.random() * 91) + 10;

          state.entryPoints[i] = state.entryPoints[i]
            ? [...state.entryPoints[i], randomDistance]
            : [randomDistance];
        });
      }
    },

    getClosestParkingSpace: (
      state,
      action: PayloadAction<{
        entryPoint: number;
        vehicleSize: VehicleType.small | VehicleType.medium | VehicleType.large;
      }>
    ) => {
      state.currentClosestParkingSpace = null;

      const { parkingSpaces } = state;
      const { entryPoint, vehicleSize } = action.payload;
      const parkingSpacesDistances = state.entryPoints[entryPoint];

      const sortedParkingSpaces = parkingSpacesDistances
        .map((distance, i) => ({
          index: i,
          distance,
        }))
        .sort((a, b) => a.distance - b.distance);

      for (let i = 0; i < sortedParkingSpaces.length; i++) {
        const currentClosest = sortedParkingSpaces[i].index;

        if (
          vehicleSize <= parkingSpaces[currentClosest].maxVehicleTypeCapacity
        ) {
          state.currentClosestParkingSpace = sortedParkingSpaces[i].index;

          break;
        }
      }
    },
  },
});

export const {
  generateParkingSpaces,
  generateInitialEntryPoints,
  getClosestParkingSpace,
} = entryPointsSlice.actions;

export default entryPointsSlice.reducer;
