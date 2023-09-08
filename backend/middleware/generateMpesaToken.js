// import axios from "axios";

// const generateMpesaToken = async (req,res,next)=>{
//     const secret = process.env.MPESA_SECRET_KEY;
//     const consumer = process.env.MPESA_CONSUMER_KEY;
//     const timestamp = new Date()
//     .toISOString()
//     .replace(/[^0-9]/g, '')
//     .slice(0, -3);

//     const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64")
//    await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',{
//     headers:{
//         authorization:`Basic ${auth}`
//     }
//    }
//    ).then((response)=>{
//     console.log(response.data.access_token)
//      const token = response.data.access_token
//     next();
//    }).catch((err)=>{
//     console.log(err);
//     // res.status(400).json(err.message)
//    })
// }
// export default generateMpesaToken;