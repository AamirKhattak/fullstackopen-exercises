import { createSlice } from "@reduxjs/toolkit";

// const initialState = `some random notification, ${new Date()}`;
const initialState = '';

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    }
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
