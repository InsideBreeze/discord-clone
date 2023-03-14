import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../reducers/channelReducer";
import serverModalReducer from "../reducers/serverModalReducer";

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    serverModalState: serverModalReducer,
  },
});
