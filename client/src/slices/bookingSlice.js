import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({baseUrl:''});
export const bookingSlice= createApi({
    baseQuery,
    tagTypes:['booking'],
    endpoints:(builder)=>({})
})