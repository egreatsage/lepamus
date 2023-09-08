import React, { useEffect, useState } from 'react'
import FormContainer from './FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'
import { Spinner, useToast } from '@chakra-ui/react';
const Register = () => {
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('')
    const [gender,setGender] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phonenumber,setPhonenumber] = useState('')
    const [gpname,setGpname] = useState('')
    const [gpcontact,setGpcontact] = useState('')
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
     
    const [register,{isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
      if (userInfo) {
         navigate('/')
      } else {
         
      }
    },[navigate,userInfo])

    const submitHandler = async (e)=>{
        e.preventDefault()
          try {
         const res = await register({firstname,phonenumber,gpcontact,gpname,lastname,gender,email,password}).unwrap()
         dispatch(setCredentials({...res}))
         navigate('/')
         toast({
          description:'Success',
          position:'top',
          status:'success',
          duration:'5000'
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
       <div className='flex justify-center items-center h-screen'>
        <FormContainer>
         <h1>Register</h1>
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
            
            <label>Phonenumber</label>
            <input
            className='input'
            type='text'
            placeholder='phonenumber'
            value={phonenumber}
            onChange={(e)=>setPhonenumber(e.target.value)}
            />
            
            <label>Guardian/Parent name</label>
            <input
            className='input'
            type='text'
            placeholder='gpname'
            value={gpname}
            onChange={(e)=>setGpname(e.target.value)}
            />
            
            <label>Guardian/Parent contact</label>
            <input
            className='input'
            type='text'
            placeholder='Enter Gender'
            value={gpcontact}
            onChange={(e)=>setGpcontact(e.target.value)}
            />
            
            <button className='bg-slate-500 w-full rounded-xl my-1 py-1 px-3 text-white text-xl ' > {isLoading ? (<Spinner/>):(
              <h1>Register</h1>
            )}</button>
            <Link className='text-blue-600 underline' to={'/login'}>Already a registered tenant, login</Link>
         </form>
         </FormContainer>
       </div>
    </div>
  )
}

export default Register