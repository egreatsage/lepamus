import React from 'react'
import {AiFillCloseCircle, AiOutlineMenu} from 'react-icons/ai'
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
    IconButton,
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
         <IconButton colorScheme='white' onClick={onOpen}>
       <AiOutlineMenu className='text-black text-xl font-bold'/>
      </IconButton>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
            <div className='flex justify-between'>
               <Link to={'/'} >Le Pamus Residency</Link>
                <div><AiFillCloseCircle onClick={onClose}/></div>
            </div>
          
          </DrawerHeader>
          <DrawerBody>
         <div className='flex flex-col ml-3 mt-20'>
            <Link className='my-4 hover:underline text-cl' to={'/dashboard'}>Dashboard</Link>
            <Link className='my-4 hover:underline text-cl' to={'/userslist'}>Users</Link>
            <Link className='my-4 hover:underline text-cl' to={'/bookinglist'}>Bookings</Link>
            <Link className='my-4 hover:underline text-cl' to={'/occupants'}>Occupants</Link>
            <Link className='my-4 hover:underline text-cl' to={'/rooms'}>Rooms</Link>
            <Link className='my-4 hover:underline text-cl' to={'/adminprofile'}>Admin Profile</Link>
            <Link className='my-4 hover:underline text-cl' to={'/extras'}>Miscellenous</Link>
         </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Sidebar