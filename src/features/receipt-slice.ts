import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";

import {
  DAY_RATE,
  FIRST_THREE_HOURS,
  LP_EXCEEDING_HOUR_RATE,
  MP_EXCEEDING_HOUR_RATE,
  SP_EXCEEDING_HOUR_RATE,
} from "../consts/park-rate";

interface IState {
  timeInHistory: {
    [key: string]: Moment; // key = plate number
  };
  timeConsumed: {
    days: number;
    hours: number;
    minutes: number;
  };
  totalCost: number;
}

const initialState: IState = {
  timeInHistory: {},
  timeConsumed: {
    days: 0,
    hours: 0,
    minutes: 0,
  },
  totalCost: 0,
};

const receiptSlice = createSlice({
  name: "parking-receipt",
  initialState,
  reducers: {
    saveParkingHistory: (
      state,
      action: PayloadAction<{ plateNumber: string; timeIn: Moment }>
    ) => {
      const { plateNumber, timeIn } = action.payload;
      const returnee = plateNumber in state.timeInHistory;

      if (
        returnee &&
        moment().diff(state.timeInHistory[plateNumber], "hour") < 1
      ) {
        return;
      }

      state.timeInHistory[plateNumber] = timeIn;
    },

    generateReceipt: (
      state,
      action: PayloadAction<{
        timeStarted: Moment;
        parkingSize: number;
        vehiclePlateNumber: string;
      }>
    ) => {
      const { timeStarted, parkingSize, vehiclePlateNumber } = action.payload;
      const { timeInHistory } = state;

      const alreadyParked = vehiclePlateNumber in timeInHistory;
      const returnee =
        alreadyParked &&
        moment().diff(timeInHistory[vehiclePlateNumber], "hour") < 1;

      const timeIn = returnee ? timeInHistory[vehiclePlateNumber] : timeStarted;

      const daysPassed = moment().diff(timeIn, "day");
      const hoursPassed = moment().diff(timeIn, "hour");
      const minutesPassed = moment().diff(timeIn, "minute");

      const exceedingHourlyRate =
        parkingSize === 0
          ? SP_EXCEEDING_HOUR_RATE
          : parkingSize === 1
          ? MP_EXCEEDING_HOUR_RATE
          : LP_EXCEEDING_HOUR_RATE;

      const excessHours = hoursPassed - daysPassed * 24;
      const tempTotalCost =
        hoursPassed <= 3
          ? FIRST_THREE_HOURS
          : daysPassed * DAY_RATE + excessHours * exceedingHourlyRate;

      state.timeConsumed = {
        days: daysPassed,
        hours: excessHours,
        minutes: minutesPassed,
      };
      state.totalCost = tempTotalCost;
    },
  },
});

export const { generateReceipt, saveParkingHistory } = receiptSlice.actions;

export default receiptSlice.reducer;
