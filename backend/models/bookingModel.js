import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    sharingtype:{type:String, required:true},
    checkindate:{type:String, required:true},
    checkoutdate:{type:String, required:true}, 
    checkindate:{type:String, required:true},  
    additionalinfo:{type:String,required:true},
    userId:{type:String,required:true},
    withFood: {
        type: Boolean,
        default: false, 
      },
    price:{type:String,required:true}
}, {

    timestamps: true,
});
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
