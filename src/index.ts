import { log } from "console";
import app from "./app.js"; 
import { databaseConnection } from "./db/connections.js";


const PORT = process.env.PORT || 5000
databaseConnection()
   .then( () =>  app.listen(PORT, () => console.log(`Server is open on the port  ans database is connected!`)))
   .catch( error => {
    console.log(error)
})
