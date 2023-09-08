import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Occupant from '../models/allotmentModel.js'
import generateToken from '../utils/generateToken.js'

//@desc auth user/set token
// route POST/api/users/auth
//@access Public

const authUser = asyncHandler( async (req,res)=>{
   const {email,password} = req.body;

   const user = await User.findOne({email})
   if (user && (await user.matchPassword(password))){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname,
        gender:user.gender,
        phonenumber:user.phonenumber,
        gpname:user.gpname,
        gpcontact:user.gpcontact,
        role:user.role
    })
}else{
    res.status(401);
    throw new Error("Invalid email or password")
}

})

//@desc Register a new user
// route POST/api/users
//@access Public

const registerUser = asyncHandler( async (req,res)=>{
    const {firstname,lastname,gender,email,password,phonenumber,gpcontact,gpname,role} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }
    const user = await User.create({
        email,
        password,
        firstname,
        lastname,
        gender,
        phonenumber,
        gpname,
        gpcontact,
        role,
    });
    if (user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            email:user.email,
            firstname:user.firstname,
            lastname:user.lastname,
            gender:user.gender,
            phonenumber:user.phonenumber,
            gpname:user.gpname,
            gpcontact:user.gpcontact,
            role:user.role,
        })
    }else{
        throw new Error("Invalid User Data")
    }
  
})

//@desc logout user
// route GET/api/users/logout
//@access Private
const logoutUser = asyncHandler( async (req,res)=>{
   res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
   })
   res.status(200).json({message:'user logged out'})
})

//@desc logout user
// route GET/api/users/profile
//@access Private

const getUserProfile = asyncHandler( async (req,res)=>{
    const user = {
        _id : req.user._id ,  
        gender     : req.user.gender,
        email      : req.user.email,
        firstname  : req.user.firstname,
        lastname   : req.user.lastname,
        gender      : req.user.gender,
        phonenumber    : req.user.phonenumber,
        gpname        : req.user.gpname,
        gpcontact       : req.user.gpcontact,
        role            :req.user.role     
    }
    res.status(200).json(user)
     
})
//@desc Update user profile
// route PUT/api/users/profile
//@access Private

const updateUserProfile = asyncHandler( async (req,res)=>{
  const user = await User.findById(req.user._id);
  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.gender = req.body.gender || user.gender;
    user.email = req.body.email || user.email;
    user.phonenumber = req.body.phonenumber || user.phonenumber;
    user.gpname = req.body.gpname || user.phonenumber;
    user.gpcontact = req.body.gpcontact || user.gpcontact;
    user.role = req.body.role || user.role;

     
    if (req.body.password){
        user.password = req.body.password
    }
    const updatedUser = await user.save();
    res.status(200).json({
        _id:updatedUser._id,
        firstname:updatedUser.firstname,
        lastname:updatedUser.lastname,
        gender:updatedUser.gender,
        email:updatedUser.email,
        phonenumber:updatedUser.phonenumber,
        gpname:updatedUser.gpname,
        gpcontact:updatedUser.gpcontact,
        role:updatedUser.role
    })

  } else {
    res.status(404);
    throw new Error('User not found');
  }
})


//@desc Get booking details for a user
// route GET /api/users/bookings
//@access Private (requires authentication)


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};