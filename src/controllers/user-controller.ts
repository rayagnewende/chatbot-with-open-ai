import { NextFunction, Response } from "express";
import User from "../models/User.js";
import bcrypt, { compare, compareSync } from "bcrypt" ; 
import { log } from "console";
import { createToken } from "../utils/token-manager.js";

const getAllUers = async (req, res)  => {
  console.log("get user all")

     try {
        const users = await User.find(); 
        return res.status(200).json({message:"ok" , users}) ; 
     } catch (error) {
       return  res.status(200).json({ message:"Error", cause:error.message})
     }
     
}

const signup = async (req, res)  => {
  console.log("user login")

  try {
    const {name, email, password} = req.body ; 
    const passwordHashed = bcrypt.hashSync(password, 10); 
     const user = new  User({ name, email, pasword:passwordHashed}) ; 
     await user.save();  
     
     res.clearCookie("auth_cookie", {
      path:"/", httpOnly:true, domain:"localhost", signed:true

    })

    const token = createToken(user._id.toString(), user.email, "7d"); 
     const expires = new Date(); 
     expires.setDate( expires.getDate() + 7); 
    res.cookie("auth_cookie", token, {
      path:'/', domain:"localhost", expiresIn: expires,httpOnly:true, signed:true
    }); 


    
     return res.status(201).json({message:"ok" , id:user._id}) ; 
  } catch (error) {
    return  res.status(200).json({ message:"Error with user création", cause:error.message}); 
  }
  
}


// user login 

const login = async (req, res)  => {
  console.log("user login")
  const { email, password} = req.body ; 
    
  try {
    const user = await User.findOne({email});     
    if(!user)
    {
      return res.status(401).json({error:"User not registered!!"}) 
    }else{
      const passwordIsCorrect = compare(password, user.password); 
      if(!passwordIsCorrect)
      {
        return res.status(403).json({errror :"Password is not correct!!"}) ; 
  
      }

      res.clearCookie("auth_cookie", {
        path:"/", httpOnly:true, domain:"localhost", signed:true

      })

      const token = createToken(user._id.toString(), user.email, "7d"); 
       const expires = new Date(); 
       expires.setDate( expires.getDate() + 7); 
      res.cookie("auth_cookie", token, {
        path:'/', domain:"localhost", expiresIn: expires,httpOnly:true, signed:true
      }); 

       return res.status(200).json({message:"ok" , id:user._id}) ; 
    }
   
  } catch (error) {
    return  res.status(200).json({ message:"Error with user login", cause:error.message}); 
  }
  
}





export { getAllUers, signup, login}                                                                                       