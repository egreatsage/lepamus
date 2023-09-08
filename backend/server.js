import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000
import userRoutes from './routes/userRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import User  from './models/userModel.js'
import Booking from './models/bookingModel.js';
import Allotment from './models/allotmentModel.js';
import Room from './models/roomModel.js';
import cors from 'cors'
import axios from 'axios'
import asyncHandler from 'express-async-handler'
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users',userRoutes)
app.use('/api/bookings',bookingRoutes)

app.get('/getUsers',(req,res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.post('/addUser', asyncHandler( async (req,res)=>{
    const {firstname,lastname,gender,email,password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(200);
        throw new Error('User already exists')
    }
    try {
     const userDoc = await  User.create({
         email,
         password,
         firstname,
         lastname,
         gender,
         phonenumber,
         gpname,
         gpcontact,
         sharingtype,
         checkindate,
         checkoudate,
         additionalinfo
     })

     res.json(userDoc);
    } catch (e) {
     throw new Error (e)
    }
}))
app.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    User.findByIdAndDelete({_id:id})
    .then(()=>{response=>res.json(response)})
    .catch(err=>res.json(err))
})
app.put('/updateUser/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { email, firstname, lastname,
     gender,phonenumber,gpname,gpcontact,
     sharingtype,checkindate,checkoutdate,
     additionalinfo } = req.body;

    try {
        const user = await User.findById(id).select('-password');

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.gender = gender;
        user.email = email;
        user.phonenumber = phonenumber;
        user.gpname=gpname ;
        user.gpcontact=gpcontact ;
        user.sharingtype=sharingtype;
        user.checkindate=checkindate;
        user.checkoutdate=checkoutdate;
        user.additionalinfo = additionalinfo;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
}));
//generate token
const generateMpesaToken = async (req, res, next) => {
    const secret = process.env.MPESA_SECRET_KEY;
    const consumer =process.env.MPESA_CONSUMER_KEY;
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    await axios
      .get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
          headers: {
            authorization: `Basic ${auth}`,
          },
        }
      )
      .then((data) => {
        req.token = data.data.access_token;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
};
app.get('/api/stk/:phone&:amount',generateMpesaToken, async (req,res)=>{
    const phone = req.params.phone;
    const amount = req.params.amount;
    const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3)
    const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");
    axios.post ('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',{
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password:password,
        Timestamp:timestamp,
        TransactionType:"CustomerPayBillOnline",
        Amount:amount,
        PartyA:`254${phone}`,
        PartyB:process.env.BUSINESS_SHORT_CODE,
        PhoneNumber:`254${phone}`,
        CallBackURL:'https://037d-154-122-104-170.ngrok-free.app/callback',
        AccountReference:'Hostel',
        TransactionDesc:'Test'
    },{
        headers:{Authorization:`Bearer ${req.token}`},
    },
    ).then((response)=>{
        console.log(response.data)
        return res.status(200).json(response.data)
    }).catch((error)=>{
        console.log(error)
        res.status(400).json(error.message)
    })
}
)
app.get('/token',(req,res)=>{
    generateMpesaToken();
})
app.post('/callback',(req, res) => {
    if(req.method == "POST"){
        res.status(200).json(req.body.Body.stkCallback)
        console.log(req.body.Body.stkCallback)
    }
})
app.post("/addBooking" , asyncHandler( async (req,res)=>{
     
    const {sharingtype,price,withFood,checkoutdate,checkindate,additionalinfo,userId} = req.body;
    try {
        const newBooking = new Booking({
            sharingtype,
            checkindate,
            checkoutdate,
            additionalinfo,
            withFood,
            price,
            userId,
        });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking)
    } catch (error) {
        res.status(401);
        throw new Error(error)
    }

}))
app.get('/getBookings',(req,res)=>{
    Booking.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.delete('/deleteBooking/:id',(req,res)=>{
    const id = req.params.id;
    Booking.findByIdAndDelete({_id:id})
    .then(()=>{response=>res.json(response)})
    .catch(err=>res.json(err))
})
app.post("/addRoom" , asyncHandler( async (req,res)=>{
     
    
    const {roomno,sharingtype} = req.body;
    try {
        const newRoom = new Room({
            sharingtype,
            roomno,
          
        });
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom)
    } catch (error) {
        res.status(401);
        throw new Error(error)
    }

}))
app.post("/allot" , asyncHandler( async (req,res)=>{
    const {sharingtype,price,userId} = req.body;
    try {
        const newOccupant = new Allotment({
            sharingtype,
            price,
            userId
          
        });
        const savedOccupant = await newOccupant.save();
        res.status(201).json(savedOccupant)
    } catch (error) {
        res.status(401).json(error)
        console.log(error)
    }
}))
app.get('/getOccupants', async (req, res) => {
    try {
      const allotments = await Allotment.find();
      res.json(allotments);
    } catch (err) {
      res.json(err);
    }
  });
  





app.use(notFound);
app.use(errorHandler);
app.get('/',(req,res)=>res.send('whats poppin'))
app.listen(port,()=>console.log(`Server listening on ${port}`))