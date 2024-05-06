import { Router } from "express"; 
import { getAllUers, login, signup, verifyUser } from "../controllers/user-controller.js";
import { loginValidation, sigupValidation, validate } from "../utils/index.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router(); 

userRouter.get('/', getAllUers); 
userRouter.post("/login", validate(loginValidation), login);     
userRouter.post("/signup", validate(sigupValidation), signup);  
userRouter.get("/auth-status",verifyToken , verifyUser);  
export default  userRouter; 