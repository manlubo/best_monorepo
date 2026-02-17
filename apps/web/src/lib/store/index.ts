import { configureStore } from "@reduxjs/toolkit";

const exampleReducer = (state = {}) => state;

export const store = configureStore({
  reducer: { _example: exampleReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
