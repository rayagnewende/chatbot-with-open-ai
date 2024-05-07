import { Router } from "express"; 
import { generateChatCompletion } from "../controllers/chat-controller.js";

const chatRouter = Router(); 

chatRouter.post("/new", generateChatCompletion); 

export default  chatRouter; 