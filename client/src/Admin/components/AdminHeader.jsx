import React from 'react'
import Sidebar from './Sidebar'
import {FaUserCircle} from 'react-icons/fa'
import { Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,} from '@chakra-ui/react'
export default function AdminHeader() {
  return (
    <div>
        <div className='justify-between items-center flex'>
         <div><Sidebar/></div>
         <div><h1>Admin</h1></div>
         <div><FaUserCircle/></div>
        </div>
    </div>
  )
}
