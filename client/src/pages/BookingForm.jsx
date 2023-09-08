import React, { useState } from 'react'
import PersonalInfo from './PersonalInfo';
import Bookingnfo from './Bookingnfo';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { setCredentials } from '../slices/authSlice';

const BookingForm = () => {
    const[section,setSection] = useState(0);
    const[formData,setFormData] = useState({
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        gender:'',
        phonenumber:'',
        gpname:'',
        gpcontact:'',
        sharingtype:'',
        checkindate:'',
        checkoutdate:'',
        additionalinfo:'',
        price: ''
    });
    const FormTitles =['Personal Information','Booking Information',]
    const sectionDisplay = ()=>{
        if (section === 0){
            return<PersonalInfo formData={formData} setFormData={setFormData}/>
        } else if(section === 1){
            return<Bookingnfo  formData={formData} setFormData={setFormData}/>
        }else {
            return <div>Thank you for Booking</div>
        }
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const [register,{isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state)=>state.auth)

    const submitHandler = async ()=>{
        try {
       const res = await register(
       formData
       ).unwrap()
       dispatch(setCredentials({...res}))
       console.log(formData)
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
        <div>
        <div className="overflow-x-hidden">
      <div className="progressbar">
        <div
          style={{ width: section === 0 ? "33.3%" : section == 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="form-container">
        <div className='flex justify-center' >
          <h1 className='md:text-2xl text-xl text-slate-800 font-bold mt-8 flex'>{FormTitles[section]}</h1>
        </div>
        <div className="body">{sectionDisplay()}</div>
        <div className="md:flex  md:justify-between pr-2 gap-2 items-center">
        <div className='mx-3'>
          <Link className='text-blue-600 underline' to={'/login'}>Already a registered tenant, login</Link>
          </div>
          <div className='mx-3 '>
          <button
          className='bg-slate-500 mx-2 w-[150px] rounded-xl my-1 py-1 px-3 text-white text-xl'
            disabled={section == 0}
            onClick={() => {
              setSection((currSection) => currSection - 1);
            }}
          >
            Prev
          </button>
          <button
          className='bg-slate-500 w-[150px] rounded-xl my-1 py-1 px-3 text-white text-xl'
            onClick={() => {
              if (section === FormTitles.length - 1) {
                submitHandler();
              } else {
                setSection((currSection) => currSection + 1);
              }
            }}
          >
            {section === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
          </div>
        
        </div>
      </div>
    </div>
        </div>
    </div>
  )
}

export default BookingForm