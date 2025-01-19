import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  message: "",
  onConfirm: null, // To store the callback for confirmation
};

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.onConfirm = action.payload.onConfirm;
    },
    hidePopup: (state) => {
      state.isVisible = false;
      state.message = "";
      state.onConfirm = null;
    },
  },
});

export const confirmationSliceStates=state=>state.confirmationReducer
export const { showPopup, hidePopup } = confirmationSlice.actions;
export default confirmationSlice.reducer;
