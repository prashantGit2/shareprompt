import mongoose from "mongoose";

let isConnected = false;
export const connectToDatabase = async () => {

    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDb is already connected")
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log("MongoDb is connected");
    } catch (error) {
        console.log(error)
    }
    
    
    
    }
