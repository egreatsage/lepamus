import { bookingSlice } from "./bookingSlice";
const BOOKINGS_URL = '/api/booking';

export const bookingApiSlice = bookingSlice.injectEndpoints({
    endpoints:(builder)=>({
        booking:builder.mutation({
            query:(data)=>({
                        url:`${BOOKINGS_URL}/addBooking`,
                        method:'POST',
                        body:data
                    }),
        })
        // login:builder.mutation({
        //     query:(data)=>({
        //         url:`${USERS_URL}/auth`,
        //         method:'POST',
        //         body:data
        //     }),
        // }),
        // register:builder.mutation({
        //     query:(data)=>({
        //         url:`${USERS_URL}`,
        //         method:'POST',
        //         body:data
        //     }),
        // }),
        // logout:builder.mutation({
        //     query:()=>({
        //         url:`${USERS_URL}/logout`,
        //         method:'POST'
        //     })
        // }),
        // updateUser:builder.mutation({
        //     query:(data)=>({
        //         url:`${USERS_URL}/profile`,
        //         method:'PUT',
        //         body:data
        //     }),
        // }),
    })
})

export const { useBookingMutation  } = bookingApiSlice;