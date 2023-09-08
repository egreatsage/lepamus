import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../slices/usersApiSlice';
import { Spinner, position, useToast } from '@chakra-ui/react';
import axios from 'axios';
const AddUser = () => {
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

  const submitHandler = async (e)=>{
      e.preventDefault()
        try {
       await axios.post("http://localhost:8000/addUser",
        {firstname,lastname,gender,email,password})
        console.log(firstname)
            toast({
              description:'User Added',
              position:'top',
              status:'success',
              duration:'5000'
           })
           navigate('/userslist')
        } catch (e) {
          console.log(e)
          toast({
            description:'there was a problem adding the user',
            position:'top',
            status:'error',
            duration:'5000'
         })
        }
  }
  return (
    <div>
        <h1 className=' ml-6 text-slate-900 md:text-2xl text-xl font-extrabold mt-28 mb-4 text-center'>
          Add Users Details
        </h1>
      <div className='flex items-center justify-center  w-full'>
      <form className='w-full mx-1 md:mx-4 border shadow-md rounded-md py-6 md:p-5 p-1' onSubmit={submitHandler}>
           <div className='grid md:grid-cols-3 gap-2'>
           <input className='input' type="email" placeholder='email'
            value={email}
            onChange={(event)=> setEmail(event.target.value)}
            />
            <input className='input' type="password" placeholder='password'
            value={password}
            onChange={(event)=> setPassword(event.target.value)}
             />
            <input className='input' type="text" placeholder='firstname'
            value={firstname} 
            onChange={(event)=> setFirstname(event.target.value)}
            />
            <input className='input' type="text" placeholder='lastname'
            value={lastname}
            onChange={(event)=> setLastname(event.target.value)}
             />
            <input className='input' type="text" placeholder='gender'
            value={gender}
            onChange={(event)=> setGender(event.target.value)}
             />
            <input className='input' type="text" placeholder='Phone Number'
            value={phonenumber}
            onChange={(event)=> setPhonenumber(event.target.value)}
             />
            <input className='input' type="text" placeholder='gpname'
            value={gpname}
            onChange={(event)=> setGpname(event.target.value)}
             />
            <input className='input' type="text" placeholder='gpcontact'
            value={gpcontact}
            onChange={(event)=> setGpcontact(event.target.value)}
             />
           </div>
            <div className='flex justify-end items-center'>
            <button type='submit' className='bg-slate-500 w-[150px] rounded-xl my-1 py-1 px-3 text-white text-xl'>{isLoading? (
              <Spinner/>
            ):(<h1>Add</h1>)}</button>
            </div>
          </form>
      </div>
        
    </div>
  )
}

export default AddUser