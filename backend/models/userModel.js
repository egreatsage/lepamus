import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {type: String,required: true,unique: true,},
    password: {type: String,required: true,},
    firstname: {type: String,required: true,},
    lastname: {type: String,required: true,},
    gender: {type: String,required: true,},
    phonenumber:{type:String, required:true},
    gpname:{type:String, required:true}, 
    gpcontact:{type:String, required:true}, 
    role: {
        type: String,
        default: 'user', 
      },
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compareSync(enteredpassword, this.password)
}

const User = mongoose.model('User', userSchema);
export default User;
