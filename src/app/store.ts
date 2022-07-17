import { configureStore } from "@reduxjs/toolkit";

import entryPoinsReducer from "../features/parking-slice";

export const store = configureStore({
  reducer: {
    parking: entryPoinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
