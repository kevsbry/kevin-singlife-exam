import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { ParkingSpace } from "../typings/parking-space";

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

    occupyParkingSpace: (
      state,
      action: PayloadAction<{ parkingIndex: number }>
    ) => {
      const { parkingIndex } = action.payload;

      state.parkingSpaces[parkingIndex].dateTimeOccupied = moment();
    },
  },
});

export const {
  generateParkingSpaces,
  generateInitialEntryPoints,
  occupyParkingSpace,
} = entryPointsSlice.actions;

export default entryPointsSlice.reducer;
