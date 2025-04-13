import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import authReducer from "./authSlice";
import { otpApi } from "./otiApi"; // 
import { candidateApi} from "./candidateSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [otpApi.reducerPath]: otpApi.reducer, 
        [candidateApi.reducerPath]: candidateApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, otpApi.middleware, candidateApi.middleware), 
});


setupListeners(store.dispatch);