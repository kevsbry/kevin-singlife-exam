import { configureStore } from "@reduxjs/toolkit";

import entryPoinsReducer from "../features/entry-points-slice";

export const store = configureStore({
  reducer: {
    entryPoints: entryPoinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
