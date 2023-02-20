import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../reducers/channelReducer";

export const store = configureStore({
  reducer: {
    channel: channelReducer,
  },
});
