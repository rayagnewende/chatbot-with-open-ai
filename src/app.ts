import { config } from "dotenv";
import express from "express"; 

const app = express(); 
config(); 
app.use(express.json()); 



export default app ; 