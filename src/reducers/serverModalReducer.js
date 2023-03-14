import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
};

const serverModalSlice = createSlice({
  name: "serverModal",
  initialState,
  reducers: {
    toggleModal(state, action) {
      return { open: action.payload };
    },
  },
});

export const { toggleModal } = serverModalSlice.actions;
export default serverModalSlice.reducer;
