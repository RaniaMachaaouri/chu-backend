import {connect} from "mongoose";

export const connectDB = async () => {
    try {
        await connect (process.env.MONGODB_CONNECTION || '');
        console.log('connect to DB!')
     
    } catch (error) {
     console.log(error);
    }
}
