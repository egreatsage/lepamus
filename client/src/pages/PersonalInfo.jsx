  import React from 'react'

export default function PersonalInfo({formData,setFormData}) {
  return (
    <div>
              <div className='justify-center items-center flex mt-8  '>
              <div className='grid sm:grid-cols-2 w-full md:grid-cols-3 gap-6 border mx-2 rounded-md my-6 shadow-sm px-2 py-4  md:px-16 md:py-16'>
              <input className='input'
              placeholder='Email'
              type='email'
              value={formData.email}
              onChange={(e)=>{
                setFormData({...formData,email:e.target.value})
              }}
            />
             <input className='input'
              placeholder='Password'
              type='password'
              value={formData.password}
              onChange={(e)=>{
                setFormData({...formData,password:e.target.value})
              }}
            />
            <input className='input'
              placeholder='FirstName'
              type='text'
              value={formData.firstname}
              onChange={(e)=>{
                setFormData({...formData,firstname:e.target.value})
              }}
            />
             <input className='input'
              placeholder='LastName'
              type='text'
              value={formData.lastname}
              onChange={(e)=>{
                setFormData({...formData,lastname:e.target.value})
              }}
            />
             <input className='input'
              placeholder='gender'
              type='text'
              value={formData.gender}
              onChange={(e)=>{
                setFormData({...formData,gender:e.target.value})
              }}
            />
               <input className='input'
              placeholder='Phonenumber'
              type='tel'
              value={formData.phonenumber}
              onChange={(e)=>{
                setFormData({...formData,phonenumber:e.target.value})
              }}
            />
             <input className='input'
              placeholder='Guardian/Parent Name'
              type='text'
              value={formData.gpname}
              onChange={(e)=>{
                setFormData({...formData,gpname:e.target.value})
              }}
            />
              <input className='input'
              placeholder='Guardian/Parent Contact'
              type='tel'
              value={formData.gpcontact}
              onChange={(e)=>{
                setFormData({...formData,gpcontact:e.target.value})
              }}
            />
          
        </div>
              </div>

      
    </div>
  )
}
