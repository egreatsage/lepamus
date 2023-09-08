import { createSlice } from "@reduxjs/toolkit";

const userslistSlice = createSlice({
    name: "users",
    initialState:{
        users:[]
    },
    reducers:{
      getUser:(state,action)=>{
          state.users = action.payload.map(user=>{
            return{id:user._id,firstname:user.firstname,
              lastname:user.lastname,gender:user.gender,
              email:user.email ,gpname:user.gpname, 
              gpcontact:user.gpcontact,
              phonenumber:user.phonenumber,
              createdAt:user.createdAt}
          })
      },
      addUser:(state,action)=>{
        state.users.push(action.payload)
      },
      updateuser:(state,action)=>{
        const index = state.users.findIndex(x=>x.id === action.payload.id)
        state.users[index]={
          id: action.payload.id,
          firstname:action.payload.firstname,
          lastname:action.payload.lastname,
          gender:action.payload.gender,
          email:action.payload.email,
          gpname:action.payload.gpname,
          gpcontact:action.payload.gpcontact,
          phonenumber:action.payload.phonenumber

        }
      },
      deleteUser:(state,action)=>{
        const id = action.payload.id;
        state.users = state.users.filter(u=>u.id !== id)
      }
    }
})
export  const {getUser,addUser,updateuser,deleteUser} = userslistSlice.actions;
export default userslistSlice.reducer;