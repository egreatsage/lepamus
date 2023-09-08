import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'

const AddRoom = () => {
    const [roomno,setRoomno]= useState('');
    const [sharingtype,setSharingType]= useState('');
    const toast = useToast();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/addRoom',{
                roomno,
                sharingtype,
             })
             toast({
                description:'Room successfully added',
                status:'success',
                position:'top',
                duration:5000
             })
        } catch (error) {
            toast({
                description:`${error}`,
                status:'error',
                position:'top',
                duration:5000
             })
        }
        
         

    }
  return (
    <div>
        <div>
          <h1 className='my-7 text-xl'></h1>
            <form onSubmit={handleSubmit} className='flex gap-2' >
              <input 
              className='input'
              type='text'
              placeholder='Room No'
              value={roomno}
              onChange={(e)=>setRoomno(e.target.value)}
              />
               <select
               value={sharingtype}
               onChange={(e)=>{setSharingType(e.target.value)}}
               className='input'
               >
                <option value="Single Room">Single Room</option>
                <option value="2 Sharing">2 Sharing</option>
                <option value="3 Sharing">3 Sharing</option>
                <option value="4 Sharing">4 Sharing</option>
               </select>
               <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddRoom