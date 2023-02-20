import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelName: null,
  channelId: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelInfo(state, action) {
      return {
        channelId: action.payload.channelId,
        channelName: action.payload.channelName,
      };
    },
  },
});

export const { setChannelInfo } = channelSlice.actions;
export default channelSlice.reducer;
