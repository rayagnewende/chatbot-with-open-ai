import { Router } from "express"; 
import { getAllUers, signup } from "../controllers/user-controller.js";

const userRouter = Router(); 

userRouter.get('/', getAllUers); 
userRouter.post("/", signup);                                
export default  userRouter; 