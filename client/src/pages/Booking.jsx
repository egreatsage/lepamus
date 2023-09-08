import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserId } from '../slices/authSlice';
const Booking = () => {
  const [checkindate, setCheckindate] = useState('')
  const [checkoutdate, setCheckoutdate] = useState('')
  const [sharingtype, setSharingType] = useState('');
  const [withFood, setWithFood] = useState(false);
  const [price, setPrice] = useState(0);
  const [additionalinfo, setAdditionalInfo] = useState(0);
  const calculatePrice = (type) => {
    let basePrice = 0;
    switch (type) {
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
    return withFood ? basePrice + 2000 : basePrice;
  };
  useEffect(() => {
    const calculatedPrice = calculatePrice(sharingtype);
    setPrice(calculatedPrice);
  }, [sharingtype, withFood]);
    

  const dispatch = useDispatch();
  const {userInfo,userId} = useSelector((state)=>state.auth);

  useEffect(() => {
    dispatch(setUserId(`${userInfo._id}`)); // Replace with the actual userId
  }, [dispatch]);  

  const formData = {
    checkindate,
    checkoutdate,
    sharingtype,
    withFood,
    price,
   
  }
  

  const handleSubmit = (e) =>{
    const formData = {
      checkindate,
      checkoutdate,
      sharingtype,
      withFood,
      price,
      userId: userId,
    }
    e.preventDefault()
    formData
    console.log(formData)
  }
  return (
    <div className='my-20'>
        <div className='flex flex-col justify-center items-center h-screen'>
          <div>
           <h1 className='text-green-400 text-md my-4 font-bold tracking-wider'>Fill In Your Room Info</h1>
           {userInfo._id}
              <form onSubmit={handleSubmit}>
                <div className=' border-b border-slate-400 pb-5 grid sm:grid-cols-2 md:grid-cols-3 gap-3 '>

                  <div>
                     <label>Checkin date</label>
                     <input className='input' placeholder='Checkindate' type="date"
                       value={checkindate}
                       onChange={(event)=>{setCheckindate(event.target.value)}}
                    />
                  </div>

                  <div>
                    <label>Checkout date</label>
                     <input className='input' placeholder='Checkindate' type="date"
                       value={checkoutdate}
                       onChange={(event)=>{setCheckoutdate(event.target.value)}}
                      />
                  </div>

                  <div>
                    <label>Room</label>
                    <select  value={sharingtype} onChange={(e) => setSharingType(e.target.value)} className='input'  >
                      <option disabled value="">Select Room Type</option>
                      <option value='Single room'>Single room (5000)</option>
                      <option value='2 Sharing'>2 Sharing (4000)</option>
                      <option value='3 Sharing'>3 Sharing (3000)</option>
                      <option value='4 Sharing'>4 Sharing (2000)</option>
                    </select>
                 
                  </div>
                  <div>
                  <label>Select Food Option</label>
                  <div className='flex gap-2'>
                   
                    <div className='gap-2'>
                      <label>Without Food</label>
                      <input  className='mx-2 bg-[#f1f1f1] cursor-pointer'
                        type='radio'
                        required
                        value='noFood'
                        checked={!withFood}
                        onChange={() => setWithFood(false)}
                      />
                    </div>
                    <div>
                      <label>With Food +(2000)</label>
                      <input className='mx-2  cursor-pointer bg-[#f1f1f1]'
                        type='radio'
                        required
                        value='withFood'
                        checked={withFood}
                        onChange={() => setWithFood(true)}
                     />

                    </div>
                  </div>
                  </div>
                  <div>
                    <label>Add extra info about you</label>
                    <textarea
                    type='text'
                    placeholder='Extra Info about you'
                    className='input'
                    rows={4}
                    />                
                  </div>
                 
                </div>


                
               
       
       
         <h1 className=' text-green-400 text-md my-4 font-extrabold tracking-wider'>Room Payment</h1>
         <div>
                 
                 {price > 0 && (
                 <p className='font-semibold text-md underline'>   
                 <h1 className='text-xl my-2 text-slate-500'>Total:Ksh {price}</h1>
                 </p>  )}   
                </div>
                <div>
                <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                <Tab>Pay with Mpesa</Tab>
                <Tab>Pay with Bank</Tab>
                </TabList>
                <TabPanels>
                <TabPanel>
                <div className='flex flex-col mx-auto gap-2'>
                  <div className='flex flex-col outline-none '>
                  <label>Enter Your Mpesa Number</label>
                     <input className='bg-[#f1f1f1] w-full md:w-[300px] outline-none py-2 rounded-md px-4 my-1' placeholder='Enter Mpesa Number' type="tel" />
                  </div>
                  <div className='flex flex-col'>
                  <label>Amount to be Paid</label>
                     <input className='bg-[#f1f1f1] w-full md:w-[300px] outline-none py-2 rounded-md px-4 my-1' placeholder='Checkindate' value={price} type="text" />
                    </div>  
                    
                  </div>
                </TabPanel>
                <TabPanel>
                <div className='flex flex-col' >
                   
                   <div className='flex my-4'>
                   <h1 className='text-xl'>Bank Name :</h1>
                   <h1 className='text-xl font-semibold text-slate-800'>Equity Bank</h1>
                   </div>
                   <div className='flex my-4'>
                    <h1 className='text-xl'>Account Number :</h1>
                   <h1 className='text-xl font-semibold text-slate-800'>0470179669287</h1>
                   </div>
                   
                </div>
                </TabPanel>
                </TabPanels>
                </Tabs>
                </div>
                  <div className='flex justify-end'>
        <button className='bg-slate-500 w-[150px] rounded-xl my-1 py-1 px-3 text-white text-xl' type='submit' >Submit</button>
        </div>
              </form>
          </div>
          <div>
           
          </div>
        </div>
    </div>
  )
}

export default Booking