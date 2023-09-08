import {configureStore,  } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { apiSlice } from './slices/apiSlice'
import userslistReducer from './slices/userslistslice'
import bookingsReducer from './slices/bookingactionSlice'
import occupantsReducer from './slices/occupantsSlice'
const store = configureStore({
    reducer: {
        auth : authReducer ,
        [apiSlice.reducerPath]:apiSlice.reducer,
        
        users: userslistReducer,
        bookings:bookingsReducer,
        occupants:occupantsReducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    default:true
})
export default store
