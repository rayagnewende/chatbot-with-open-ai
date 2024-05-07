import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import bcrypt, { compare } from "bcrypt" ; 
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
  console.log("user signup")

  try {
    const {name, email, password} = req.body ; 
    const passwordHashed = await bcrypt.hash(password, 10); 
     const user = new  User({ name, email, password:passwordHashed}) ; 
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


    
     return res.status(201).json({message:"ok" , id:user._id, name:user.name, email:user.email}) ; 
  } catch (error) {
    return  res.status(200).json({ message:"Error with user création", cause:error.message}); 
  }
  
}


// user login 

const login = async (req, res)  => {

  console.log("user login")
  const { email, password} = req.body; 
    
  try {
    const user = await User.findOne({email});    
     
    if(!user)
    {
      return res.status(401).json({error:"User not registered!!"}) 
    }

      const passwordIsCorrect = await compare(password, user.password); 
      
      if(!passwordIsCorrect)
      {
        return res.status(403).json({errror :"Password is not correct!!"}) ; 
  
      }
      // console.log(req.signedCookies)
      res.clearCookie("auth_cookie", {
        path:"/", httpOnly:true, domain:"localhost", signed:true

      })

      const token = createToken(user._id.toString(), user.email, "7d"); 
       const expires = new Date(); 
       expires.setDate( expires.getDate() + 7); 
      res.cookie("auth_cookie", token, {
        path:'/', domain:"localhost", expiresIn: expires,httpOnly:true, signed:true
      });
       
   return res.status(200).json({message:"ok" , name:user.name, email:user.email}) ; 
   
  } catch (error) {
    return  res.status(200).json({ message:"Error with user login", cause:error.message}); 
  }
  
}


 const verifyUser = async (req, res) => {

  // user token check 
   console.log("user verify !!");
   console.log(res.locals.jwtData.id);
   return   res.status(400).json({ test: "nous testons le token!!!"}); 
    
  try {
    const user = await User.findById(res.locals.jwtData.id);    
     
    if(!user)
    {
      return res.status(401).json({error:"User not registered!! or Token is not correct"}) 
    }

    if(user._id.toString() !== res.locals.jwtData.id)
      {
        return res.send("Permissions are denied!!!!")
      }

       
   return res.status(200).json({message:"ok" , name:user.name, email:user.email}) ; 
   
  } catch (error) {
    return  res.status(200).json({ message:"Error with user login", cause:error.message}); 
  }

}







export { getAllUers, signup, login, verifyUser}                                                                                       