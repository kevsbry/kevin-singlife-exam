import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Moment } from "moment";
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
          vehiclePlateNumber: null,
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
      action: PayloadAction<{
        parkingIndex: number;
        timeIn: Moment;
        vehiclePlateNumber: string;
      }>
    ) => {
      const { parkingIndex, timeIn, vehiclePlateNumber } = action.payload;

      state.parkingSpaces[parkingIndex].vehiclePlateNumber = vehiclePlateNumber;
      state.parkingSpaces[parkingIndex].dateTimeOccupied = timeIn;
    },

    freeUpParkingSpace: (
      state,
      action: PayloadAction<{
        parkingIndex: number;
      }>
    ) => {
      const { parkingIndex } = action.payload;

      state.parkingSpaces[parkingIndex].vehiclePlateNumber = null;
      state.parkingSpaces[parkingIndex].dateTimeOccupied = null;
    },

    addEntryPoint: (state) => {
      const { entryPoints, parkingSpaces } = state;
      const { length } = entryPoints;

      parkingSpaces.forEach(() => {
        const randomDistance = Math.floor(Math.random() * 91) + 10;

        state.entryPoints[length + 1] = state.entryPoints[length + 1]
          ? [...state.entryPoints[length + 1], randomDistance]
          : [randomDistance];
      });
    },
  },
});

export const {
  generateParkingSpaces,
  generateInitialEntryPoints,
  occupyParkingSpace,
  addEntryPoint,
  freeUpParkingSpace,
} = entryPointsSlice.actions;

export default entryPointsSlice.reducer;
