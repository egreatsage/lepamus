import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const users = useSelector((state) => state.users.users);
  const user = users.find((u) => u.id === id);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [phonenumber,setPhonenumber] = useState('')
  const [gpname,setGpname] = useState('')
  const [gpcontact,setGpcontact] = useState('')

  const updateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedUserData = {
        firstname,
        lastname,
        gender,
        email,
        phonenumber,
        gpname,
        gpcontact
      };
      await axios.put(`http://localhost:8000/updateUser/${id}`, updatedUserData);
      toast({
        description: 'User updated successfully',
        position: 'top',
        status: 'success',
        duration: 5000,
      });

      navigate('/userslist');
    } catch (err) {
      toast({
        description: `${err}`,
        position: 'top',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
     <h1 className=' ml-6 text-slate-900 md:text-2xl text-xl font-extrabold mt-28 mb-4 text-center'>
          Edit Users Details
        </h1>
      <div className='flex items-center justify-center  w-full'>
      <form className='w-full mx-1 md:mx-4 border shadow-md rounded-md py-6 md:p-5 p-1' onSubmit={updateUser}>
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
  );
};

export default EditUser;
