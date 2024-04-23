import { Router } from "express"; 
import { getAllUers, login, signup } from "../controllers/user-controller.js";
import { loginValidation, sigupValidation, validate } from "../utils/index.js";

const userRouter = Router(); 

userRouter.get('/', getAllUers); 
userRouter.post("/login", validate(loginValidation), login);     
userRouter.post("/signup", validate(sigupValidation), signup);     
export default  userRouter; 