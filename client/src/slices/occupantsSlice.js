import { createSlice } from "@reduxjs/toolkit";

const occupantsSlice = createSlice({
    name: "occupants",
    initialState:{
        occupants:[]
    },
    reducers:{
      getOccupant:(state,action)=>{
          state.occupants = action.payload.map(occupant=>{
            return{id:occupant._id,sharingtype:occupant.sharingtype,
              price:occupant.price,userId:occupant.userId,
            }
          })
      },
      addOccupant:(state,action)=>{
        state.occupants.push(action.payload)
      },
      updateoccupant:(state,action)=>{
        const index = state.occupants.findIndex(x=>x.id === action.payload.id)
        state.occupants[index]={
          id: action.payload.id,
          sharingtype:action.payload.sharingtype,
          price:action.payload.price,
          userId:action.payload.userId,
        }
      },
      deleteOccupant:(state,action)=>{
        const id = action.payload.id;
        state.occupants = state.occupants.filter(u=>u.id !== id)
      }
    }
})
export  const {getOccupant,addOccupant,updateoccupant,deleteOccupant} = occupantsSlice.actions;
export default occupantsSlice.reducer;