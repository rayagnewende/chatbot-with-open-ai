                                                                                                                                                                            
    import { connect, disconnect } from "mongoose";

async function databaseConnection() {
    
    try {
        await connect(process.env.MONGODB_URL); 
    } catch (error) {
        console.log(error);
        throw new Error("Database connection has failed!")
        
    }
}


async function disconnectToDatabase() {
    try {
        await disconnect(); 
    } catch (error) {
        console.log(error)
        throw new Error('Could not disconnect the database!')
    }
}


export { databaseConnection, disconnectToDatabase}