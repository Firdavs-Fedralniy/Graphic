import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../src/features/themeSlice"
import authSlice from "../src/features/authSlice"
import notificationsSlice from "../src/features/notificationsSlice"
import { authApi } from "./services/authApi";
import { graphicApi } from "./services/graphicsApi";



export const store = configureStore({
  reducer: {
    themeSlice: themeSlice,
    auth: authSlice,
    notifications: notificationsSlice,
    [authApi.reducerPath]: authApi.reducer,
    [graphicApi.reducerPath]: graphicApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authApi.middleware).concat(graphicApi.middleware)
})