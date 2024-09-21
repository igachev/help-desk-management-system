import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../features/ticket/ticketSlice";
import userReducer from "../features/user/userSlice" 
const store = configureStore({
    reducer: {
        ticket: ticketReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch