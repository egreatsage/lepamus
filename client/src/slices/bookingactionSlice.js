import { createSlice } from "@reduxjs/toolkit";

const bookingsSlice = createSlice({
    name: "bookings",
    initialState:{
        bookings:[]
    },
    reducers:{
      getBooking:(state,action)=>{
          state.bookings = action.payload.map(booking=>{
            return{id:booking._id,checkindate:booking.checkindate,
              checkoutdate:booking.checkoutdate,sharingtype:booking.sharingtype,
              additionalinfo:booking.additionalinfo ,price:booking.price, 
              userId:booking.userId,
              createdAt:booking.createdAt}
          })
      },
      addBooking:(state,action)=>{
        state.bookings.push(action.payload)
      },
      updatebooking:(state,action)=>{
        const index = state.bookings.findIndex(x=>x.id === action.payload.id)
        state.bookings[index]={
          id: action.payload.id,
          checkindate:action.payload.checkindate,
          checkoutdate:action.payload.checkoutdate,
          sharingtype:action.payload.sharingtype,
          additionalinfo:action.payload.additionalinfo,
          price:action.payload.price,
          withFood:action.payload.withFood,

        }
      },
      deleteBooking:(state,action)=>{
        const id = action.payload.id;
        state.bookings = state.bookings.filter(u=>u.id !== id)
      }
    }
})
export  const {getBooking,addBooking,updatebooking,deleteBooking} = bookingsSlice.actions;
export default bookingsSlice.reducer;