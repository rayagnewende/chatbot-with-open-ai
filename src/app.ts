import { config } from "dotenv";
import express from "express"; 
import morgan from "morgan";
import appRouter from "./routes/index.js";

const app = express(); 
config(); 
app.use(express.json()); 

app.use('/api/v1', appRouter); 
app.use(morgan("dev"))


export default app ; 