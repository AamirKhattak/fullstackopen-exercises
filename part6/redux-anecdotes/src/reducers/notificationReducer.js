import { createSlice } from "@reduxjs/toolkit";

// const initialState = `some random notification, ${new Date()}`;
const initialState = {notification: null, timeoutID: null};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    remove(state) {
      return initialState;
    },
  },
});

export const { create, remove } = notificationSlice.actions;

export const setNotification = (notificationText, durationInSeconds, pTimeoutID) => {
  return async (dispatch) => {
    if(pTimeoutID) clearTimeout(pTimeoutID);

    const timeoutID = setTimeout(() => {
      dispatch(remove());
    }, 1000 * durationInSeconds);
    dispatch(create({notificationText, timeoutID}));
  };
};
export default notificationSlice.reducer;
