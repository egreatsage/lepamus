import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Tenant from "./components/Tenant"
import PrivateRoute from "./components/PrivateRoute"
import Booking from "./pages/Booking"
import Payment from "./pages/Payment"
import BookNow from "./pages/BookNow"
import Contact from "./pages/Contact"
import Footer from "./components/Footer"
import Book from "./pages/Book"
import BookingList from "./Admin/pages/Bookings/BookingList"
import AddUser from "./Admin/pages/Users/AddUser"
import AddRoom from "./Admin/pages/Rooms/AddRoom"
import EditRoom from "./Admin/pages/Rooms/EditRoom"
import Allotment from "./Admin/pages/Bookings/Allotment"
import EditUser from "./Admin/pages/Users/EditUser"
import UsersList from "./Admin/pages/Users/UsersList"
import Dashboard from "./Admin/pages/Dashboard"

const App = ()=>{
  return(
    <div className="overflow-hidden">

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="" element={<PrivateRoute/>}>
      <Route path="/tenant" element={<Tenant/>}/>
      </Route>
      <Route path="/booknow" element={<BookNow/>}/>
      <Route path="/payment" element={<Payment/>}/>
      <Route path="/contactus" element={<Contact/>}/>
      <Route path="/book" element={<Book/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>

      
      {/* Admin */}
      <Route path="/bookinglist" element={<BookingList/>}/>
      <Route path="/adduser" element={<AddUser/>}/>
      <Route path="/addroom" element={<AddRoom/>}/>
      <Route path="/editroom/:id" element={<EditRoom/>}/>
      {/* <Route path="/rooms" element={<Rooms/>}/> */}
      <Route path="/allotbooking/:id" element={<Allotment/>}/>
      <Route path="/edituser/:id" element={<EditUser/>}/>
      <Route path="/userslist" element={<UsersList/>}/>
      
    </Routes>
    <Footer/>
    </div>
  )
}
export default App