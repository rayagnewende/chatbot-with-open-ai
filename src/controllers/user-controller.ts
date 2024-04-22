import { NextFunction, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt" ; 

const getAllUers = async (req, res)  => {
    
     try {
        const users = await User.find(); 
        return res.status(200).json({message:"ok" , users}) ; 
     } catch (error) {
       return  res.status(200).json({ message:"Error", cause:error.Message})
     }
     
}

const signup = async (req, res)  => {
    
  try {
    const {name, email, password} = req.body ; 
    const passwordHashed = bcrypt.hashSync(password, 10); 
     const user = new  User({ name, email, pasword:passwordHashed}) ; 
     await user.save() ; 
     return res.status(200).json({message:"ok" , id:user._id}) ; 
  } catch (error) {
    return  res.status(200).json({ message:"Error with user création", cause:error.Message}); 
  }
  
}





export { getAllUers, signup}