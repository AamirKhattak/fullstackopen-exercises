import { createSlice } from "@reduxjs/toolkit";

// const initialState = `some random notification, ${new Date()}`;
const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    remove(state){
        return null;
    }
  },
});

export const { create, remove } = notificationSlice.actions;
export default notificationSlice.reducer;
