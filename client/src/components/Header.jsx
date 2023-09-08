import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import {logout} from '../slices/authSlice'
import { AiOutlineMenu} from 'react-icons/ai'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

const Header = () => {
  const {userInfo} = useSelector((state)=>state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [logoutApiCall]= useLogoutMutation();

  const logoutHandler = async () =>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(err)
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  return (
    <div className=''>
           <div className="flex justify-between items-center border-b border-slate-400 py-3 px-3 shadow-sm shadow-slate-200">
           <div className=''>
               <h1 className='text-2xl font-extrabold tracking-widest text-slate-800'>Le Pamus</h1>
           </div>
           <div className='md:flex hidden gap-2 items-center mx-3'>
              <Link to={'/'}>Home</Link>
              <Link to={'/tenant'}>Tenant</Link>
              <Link to={'/contactus'}>Contact Us</Link>
              <button className='border border-none outline-none' onClick={logoutHandler}>Logout</button>
              <Link to={'/dashboard'}>Dashboard</Link>
           </div>
           <div className='md:hidden flex'>
           < AiOutlineMenu  className='text-black text-xl font-bold md:hidden' onClick={onOpen}/> 
           </div>
           </div>
             <div>
             <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Le Pamus</DrawerHeader>

          <DrawerBody>
          <div className='flex flex-col gap-2'>
              <Link to={'/'}>Home</Link>
              <Link to={'/tenant'}>Tenant</Link>
              <Link to={'/contactus'}>Contact Us</Link>
              <button className='border border-none outline-none' onClick={logoutHandler}>Logout</button>
              <Link to={'/dashboard'}>Dashboard</Link>
            
           
            </div>
          </DrawerBody>

          <DrawerFooter>
          (C) All rights reserved || le pamus residency
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
             </div>
    </div>
  )
}

export default Header