import React, { useEffect, useState } from 'react'
import FormContainer from './FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice'
import { Spinner, useToast } from '@chakra-ui/react';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import TenantDetails from './TenantDetails';
import Header from './Header';
const Tenant = () => {
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('')
    const [gender,setGender] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
     
    const {userInfo} = useSelector((state)=>state.auth)
    const [updateProfile,isLoading] = useUpdateUserMutation()

    useEffect(()=>{
      setFirstname(userInfo.firstname);
      setLastname(userInfo.lastname);
      setGender(userInfo.gender);
      setEmail(userInfo.email)
      setPassword(userInfo.password)
    },[userInfo.firstname,userInfo.lastname,userInfo.gender,userInfo.email])

    const submitHandler = async (e)=>{
        e.preventDefault()
          try {
               const res = await updateProfile({
                _id:userInfo._id,
                firstname,lastname,gender,email,password
               }).unwrap();
               dispatch(setCredentials({...res}))
               toast({
                description:'profile updated',
                status:'success',
                position:'top',
                duration:5000
               })
          } catch (err) {
            toast({
              description:`${err?.data?.message || err.error}`,
              position:'top',
              status:'error',
              duration:'5000'
           })
          }
    }
  return (
    <div>
      <Header/>
      <div>
      <TenantDetails/>
       <div className='flex justify-center items-center h-screen'>
        <FormContainer>
         <h1>Update Profile</h1>
         <form onSubmit={submitHandler}>
            <label>Email</label>
            <input
            className='input'
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
            className='input'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />

             <label>Firstname</label>
            <input
            className='input'
            type='text'
            placeholder='Enter firstname'
            value={firstname}
            onChange={(e)=>setFirstname(e.target.value)}
            />

            <label>Lastname</label>
            <input
            className='input'
            type='text'
            placeholder='Enter lastname'
            value={lastname}
            onChange={(e)=>setLastname(e.target.value)}
            />
            
            <label>Gender</label>
            <input
            className='input'
            type='text'
            placeholder='Enter Gender'
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            />  
            <button className='bg-slate-500 w-full rounded-xl my-1 py-1 px-3 text-white text-xl' > {isLoading ? ( <h1>Update</h1>):(
              <Spinner/>
            )}</button>   
         </form>
         </FormContainer>
       </div>
      </div>
     
    </div>
  )
}

export default Tenant