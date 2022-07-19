import { configureStore } from "@reduxjs/toolkit";

import entryPoinsReducer from "../features/parking-slice";
import receiptReducer from "../features/receipt-slice";

export const store = configureStore({
  reducer: {
    parking: entryPoinsReducer,
    receipt: receiptReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
