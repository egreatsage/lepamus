import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'

const addBooking = asyncHandler( async (req,res)=>{
     
    const {sharingtype,checkoutdate,checkindate,additionalinfo,userId} = req.body;
    try {
        const newBooking = new Booking({
            sharingtype,
            checkindate,
            checkoutdate,
            additionalinfo,
            userId,
        });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking)
    } catch (error) {
        res.status(401);
        throw new Error(error)
    }

})

export{
    addBooking
}