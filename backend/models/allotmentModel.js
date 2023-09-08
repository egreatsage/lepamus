import mongoose from "mongoose";
const allotmentSchema = new mongoose.Schema({
    sharingtype:{type:String, required:true},
    price:{type:String, required:true},
    userId:{type:String, required:true},
}, {

    timestamps: true,
});
const Allotment = mongoose.model('Occupants', allotmentSchema);
export default Allotment;
