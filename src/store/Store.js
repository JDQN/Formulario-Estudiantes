import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/setting/SettingsSlice";
import authReducer from "./slices/auth/AuthSlice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
  },
});

export { store };