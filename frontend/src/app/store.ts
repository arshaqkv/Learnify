import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/admin/adminSlice"
import chatReducer from "../features/chat/chatSlice"

const userPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const adminPersistConfig = {
  key: "admin",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const rootReducer = combineReducers({
  auth: persistReducer(userPersistConfig, authReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
  chat: chatReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;