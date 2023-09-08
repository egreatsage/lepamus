import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Allotment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const bookings = useSelector((state) => state.bookings.bookings);
  const booking = bookings.find((u) => u.id === id);

  const [sharingtype,setSharingType] = useState(booking.sharingtype);
  const [price,setPrice] = useState(booking.price);
  const [userId,setUserId] = useState(booking.userId);

  
  
  const handleSubmit = async (e)=>{
   e.preventDefault();
   const formData ={
    sharingtype,
      price,
      userId
   }
  try {
    await axios.post('http://localhost:8000/allot',
      formData
     );
     console.log(formData)
     toast({
      description:'Successfully alloted',
      status:'success',
      position:'top',
      duration:5000
     })
  } catch (err) {
    toast({
      description:`${err}`,
      status:'error',
      position:'top',
      duration:5000
     })
  }
  }
  return (
    <div>
    <form onSubmit={handleSubmit}>
    <input
      className='input'
      type="text"
      placeholder={booking.sharingtype} 
      disabled
      value={booking.sharingtype}
      onChange={(e)=>setSharingType(e.target.value)}
      />
       <input
      className='input'
      type="text"
      placeholder={booking.price} 
      disabled
      value={booking.price}
      onChange={(e)=>setPrice(e.target.value)}
      />
       <input
      className='input'
      type="text"
      placeholder={booking.userId} 
      disabled
      value={booking.userId}
      onChange={(e)=>setUserId(e.target.value)}
      />
      <button type='submit'>Allot</button>
    </form>
    </div>
  )
}

export default Allotment