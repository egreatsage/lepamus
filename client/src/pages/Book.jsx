import { useToast } from '@chakra-ui/react';
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useBookingMutation  } from '../slices/bookingApiSlice';
import axios from 'axios'
import { setUserId } from '../slices/authSlice';
import Header from '../components/Header';
const Book = () => {
    const [withFood, setWithFood] = useState(false);
    const [sharingtype, setSharingType] = useState('');
    const [price, setPrice] = useState(0);
    const [checkindate,setCheckindate] = useState('');
    const [checkoutdate,setCheckoutdate] = useState('');
    const [additionalinfo, setAdditionalInfo] = useState('');
  
    const calculatePrice = (sharingType, foodStatus) => {
      let basePrice = 0;
      switch (sharingType) {
          case 'Select Room':
            basePrice = 0;
        case 'Single room':
          basePrice = 5000;
          break;
        case '2 Sharing':
          basePrice = 4000;
          break;
        case '3 Sharing':
          basePrice = 3000;
          break;
        case '4 Sharing':
          basePrice = 2000;
          break;
        default:
          basePrice = 0;
      }
  
      // Add 2000 to the base price if "with food" is selected, otherwise return the base price only
      return foodStatus ? basePrice + 2000 : basePrice;
    };
    useEffect(() => {
      const calculatedPrice = calculatePrice(sharingtype, withFood);
      setPrice(calculatedPrice);
    }, [sharingtype, withFood]);
    const navigate = useNavigate();
    const toast = useToast()
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setUserId(`${userInfo._id}`)); // Replace with the actual userId
    }, [dispatch]);  
    const {userInfo,userId} = useSelector((state)=>state.auth);


    const handleSubmit = async (e)=>{
        e.preventDefault()
          try {
        await axios.post('http://localhost:8000/addBooking',
         {checkindate,checkoutdate,price,withFood,sharingtype,additionalinfo, userId: userId,})
         navigate('/payment')
         toast({
          description:'Success',
          position:'top',
          status:'success',
          duration:'5000'
       })
          } catch (err) {
            toast({
              // description:`${err?.data?.message || err.error}`,
              description:`${err}`,
              position:'top',
              status:'error',
              duration:'5000'
           })
          }
    }
  return (
    <div>
      <Header/>
          <div className="justify-center items-center flex mt-8">
        <div className="border shadow-sm my-6 w-full ">
          <div>
            <form onSubmit={handleSubmit} className='grid sm:grid-cols-2 w-full md:grid-cols-3 gap-6 mx-2 rounded-md my-6px-2 py-4 md:px-16 md:py-16'>
            <div>
              <label>Checkin Date</label>
              <input
                className="input"
                type="date"
                value={checkindate}
                onChange={(e) =>setCheckindate(e.target.value)} 
              />
            </div>
            <div>
              <label>Checkout Date</label>
              <input
                className="input"
                type="date"
                value={checkoutdate}
                onChange={(e) =>setCheckoutdate(e.target.value)}
              />
            </div>
            <div>
              <label>Room</label>
              <select
                className="w-full py-[10px] mt-[6px] outline-none bg-[#f1f1f1] rounded-[8px] border-none px-3"
                value={sharingtype}
                onChange={(e) =>setSharingType(e.target.value)}
              >
                <option  value="Select Room">
                  Select Room Type
                </option>
                <option value="Single room">Single room (5000)</option>
                <option value="2 Sharing">2 Sharing (4000)</option>
                <option value="3 Sharing">3 Sharing (3000)</option>
                <option value="4 Sharing">4 Sharing (2000)</option>
              </select>
            </div>
            <div className='mx-3'>
              <label>With Food</label>
              <input
              className='mx-3'
                type="checkbox"
                checked={withFood}
                onChange={() => {
                  setWithFood(!withFood); // Toggle withFood state
                }}
              />
            </div>
            <div>
              <label>Additional Information</label>
              <textarea
                className="input"
                placeholder="Extra info about you"
                type="text"
                rows={4}
                value={additionalinfo}
                onChange={(e) =>setAdditionalInfo(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                className="input"
                placeholder="Extra info about you"
                type="text"
              
                value={price}
                onChange={(e) =>setPrice(e.target.value)}
              />
            </div>
            <div>
              <button type='submit'>Submit</button>
            </div>
            </form>
           
          </div>
          <div>
          <div className='flex items-center'>
                <span className='text-gray-800 text-xl '>Room Sharing :</span>
                <span className='text-slate-800 font-extrabold'>{sharingtype}</span>
            </div>
            <div className='flex items-center'>
                <span className='text-gray-800 text-xl '> Food Status :</span>
                <span className='text-slate-800 font-extrabold'> {withFood ? 'With Food (+2000)' : 'Without Food'}</span>
            </div>
            <div className='flex items-center'>
                <span className='text-gray-800 text-xl '>Total Amount to be paid:</span>
                <span className='text-slate-800 font-extrabold text-xl underline mx-3'> Ksh {price} / per head</span>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}
export default Book