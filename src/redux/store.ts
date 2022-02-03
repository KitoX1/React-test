import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import ordersSlice from './slices/ordersSlice';
import restaurantsSlice from './slices/restaurantsSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        orders: ordersSlice,
        restaurants: restaurantsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>