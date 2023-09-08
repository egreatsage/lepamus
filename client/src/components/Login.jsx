import React, { useEffect, useState } from 'react'
import FormContainer from './FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner, position, useToast } from '@chakra-ui/react'
import Loader from './Loader'

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const [login,{isLoading}] = useLoginMutation();
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
         const res = await login({email,password}).unwrap()
         dispatch(setCredentials({...res}))
         navigate('/')
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
         <h1>Login</h1>
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
          
            <button className='bg-slate-500 w-full rounded-xl my-1 py-1 px-3 text-white text-xl ' >
            {isLoading ? (<Spinner/>):(
              <h1>Login</h1>
            )}
            </button>
         </form>
         <Link className='text-blue-600 underline' to={'/booknow'}>Not yet a  tenant, Register</Link>
         </FormContainer>
       </div>
    </div>
  )
}

export default Login