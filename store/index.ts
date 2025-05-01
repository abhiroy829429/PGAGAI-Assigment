import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { weatherApi } from "./apis/weatherApi"
import { newsApi } from "./apis/newsApi"
import { financeApi } from "./apis/financeApi"
import themeReducer from "./slices/themeSlice"
import userReducer from "./slices/userSlice"
import dashboardReducer from "./slices/dashboardSlice"

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [financeApi.reducerPath]: financeApi.reducer,
    theme: themeReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, newsApi.middleware, financeApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
