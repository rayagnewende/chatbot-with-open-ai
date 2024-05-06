import { config } from "dotenv";
import express from "express"; 
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"; 

const app = express(); 
config()
app.use(cors({ origin:"http://localhost:5173", credentials:true})); 
app.use(express.json()); 
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/api/v1', appRouter); 
app.use(morgan("dev"))


export default app ; 