import { User } from "../models/user.js"
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
export const register = TryCatch (async (req,res) => {
    const{email,name,password} = req.body;
    let  user = await User.findOne({email});
    if (user)
        return res.status(400).json({
        message:"User already exist",
    });

     const hashPassword = await bycrpt.hash(password,10)

     user = {
        name,
        email,
        password: hashPassword,
     }

     const otp = Math.floor(Math.random()*1000000);

     const activationToken= jwt.sign({
        user,
        otp,
     },process.env.Activation_Secret,
     {
         expiresIn: "5m",
     });
     const data ={
        name,
        otp,
     };
     await sendMail(
        email,"silentdeath", data) ;

     res.status(200).json({
        message: "otp send to your mail" ,
        activationToken,
       });
})
    

export const verifyUser = TryCatch(async(req,res)=>{
 const {otp,activationToken} = req.body
 const verify = jwt.verify(activationToken,process.env.Activation_Secret)
 if(!verify) 
    return res.status(400).json({
      message: "Otp Expired",
    });
    if(verify.otp != otp) 
        return res.status(400).json({
         message: "Wrong Otp",
        });
      await User.create({
        name: verify.user.name,
        email:verify.user.email,
        password:verify.user.password,
      })

      res.json ({
        message: "User Registered",
      })
});

export const loginUser = TryCatch(async(req,res)=>{
   const {email, password} = req.body

   const user = await User.findOne({email}) // Add await here

   if(!user) 
      return res.status(400).json({
        message: "no user with this email",
      });
   const matchPassword = await bycrpt.compare(password, user.password); // Corrected variable name

   if(!matchPassword)
      return res.status(400).json({
        message: "wrong Password",
     });

     const token = jwt.sign({_id: user._id}, process.env.Jwt_Sec,{
      expiresIn: "15d",
     });

     res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });

     res.json({ 
      message: `Welcome Back ${user.name}`,
      token,
      user,
     });
});
export const myProfile = TryCatch(async(req,res)=>{
   const user= await User.findById(req.user._id);
   res.json({ user });
});