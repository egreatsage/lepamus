  import React, { useState } from 'react'
import axios from 'axios'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
const Payment = () => {
const {userInfo} = useSelector((state)=>state.auth);
const [amount,setAmount] = useState('')
const [phone,setPhone] = useState('')

  const handleSubmit = (e) =>{
  e.preventDefault();
       axios.get(`http://localhost:8000/api/stk/${phone}&${amount}`)
  }
  return (
    <div>
         <div>
              <div className='justify-center items-center flex h-screen w-full  '>
              <div>
        <h1 className=' text-green-400 text-md my-4 font-extrabold tracking-wider'>Room Payment</h1>
         <div>
                 {/* {price > 0 && (
                 <p className='font-semibold text-md underline'>   
                 <h1 className='text-xl my-2 text-slate-500'>Total:Ksh {price}</h1>
                 </p>  )}    */}
                </div>
                <div>
                <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                <Tab>Pay with Mpesa</Tab>
                <Tab>Pay with Bank</Tab>
                </TabList>
                <TabPanels>
                <TabPanel>
              <form onSubmit={handleSubmit}>
              <div className='flex flex-col mx-auto gap-2'>
                  <div className='flex flex-col outline-none '>
                  <label>Enter Your Mpesa Number</label>
                     <input className='bg-[#f1f1f1] w-full md:w-[300px] outline-none py-2 rounded-md px-4 my-1' 
                     value={phone}
                     onChange={(e)=>setPhone(e.target.value)}
                     placeholder='Enter Mpesa Number'
                      type="tel" />
                  </div>
                  <div className='flex flex-col'>
                  <label>Amount to be Paid</label>
                     <input className='bg-[#f1f1f1] w-full md:w-[300px] outline-none py-2 rounded-md px-4 my-1' 
                     value={amount}
                     onChange={(e)=>setAmount(e.target.value)}
                      placeholder='amount to be paid' type="text" />
                    </div>  
                    
                  </div>
                   <button type='submit'>Submit</button>
              </form>
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
    </div>
              </div>
         </div>
    </div>
  )
}

export default Payment