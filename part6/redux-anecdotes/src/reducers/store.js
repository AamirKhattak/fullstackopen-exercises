
import {configureStore} from "@reduxjs/toolkit"

import anecdoteReducer from "./anecdoteReducer";
import notificationReducer from "./notificationReducer";

const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        notification: notificationReducer
    }
})

export default store;