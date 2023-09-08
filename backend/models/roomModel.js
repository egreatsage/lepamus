import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
    roomno:{type:String, required:true},
    sharingtype:{type:String, required:true},
}, {

    timestamps: true,
});
const Room = mongoose.model('Rooms', roomSchema);
export default Room;
