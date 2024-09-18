import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../features/ticket/ticketSlice";

const store = configureStore({
    reducer: {
        ticket: ticketReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch