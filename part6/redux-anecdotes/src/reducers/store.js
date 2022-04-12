
import {configureStore} from "@reduxjs/toolkit"

import anecdoteReducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";
import notificationReducer from "./notificationReducer";

const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
})

export default store;