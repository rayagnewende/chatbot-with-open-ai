import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import  jwt  from "jsonwebtoken";
import { ConfigureOpenAI } from "../config/openai-confg.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";


const  generateChatCompletion = async (req:Request, res:Response, next:NextFunction) => {
    const { message } = req.body ; 
    
    try {
        const decoded = jwt.verify(req.signedCookies['auth_cookie'],process.env.JWT_SECRET);
     
    const user = await User.findById(decoded.id); 
    if(!user)
        {
            return res.status(401).json({ message: "User has unregistred or token has malfunctioned!"})
        }

      const chats = user.chats.map( ({role, content})  => ({role, content})) as ChatCompletionRequestMessage[]; 
      chats.push({ role:"user", content:message}); 


      const config = ConfigureOpenAI(); 
      const openai = new OpenAIApi(config); 

      const chatResponse = await openai.createChatCompletion({
        model : "gpt-3.5-turbo", 
        messages : chats 
      }); 

      user.chats.push(chatResponse.data.choices[0].message); 

      await user.save();  
                    
      res.status(200).json({ chats: user.chats});  

    } catch (error) {
        return res.status(500).json(({ message : " Somethings went wrong!!!"}))
        
    }

}


export { generateChatCompletion}