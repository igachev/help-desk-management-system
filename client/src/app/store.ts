import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../features/ticket/ticketSlice";
import userReducer from "../features/user/userSlice"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({ 
    ticket: ticketReducer,
    user: userReducer,
  })

const persistedReducer = persistReducer(persistConfig,rootReducer)
  
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch