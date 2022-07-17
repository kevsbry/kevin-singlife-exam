import { createSlice } from "@reduxjs/toolkit";

import { ParkingSpace } from "../typings/parking-space";

const initialState: {
  entries: {
    parkingSpaces: ParkingSpace[];
  }[];
} = {
  entries: [],
};

const entryPointsSlice = createSlice({
  name: "entry-points",
  initialState,
  reducers: {},
});

export const {} = entryPointsSlice.actions;

export default entryPointsSlice.reducer;
