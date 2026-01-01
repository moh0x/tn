const mongoose = require('mongoose');

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('db connected');
        
    } catch (error) {
        console.log(error);
        
        console.log('error to connect to db');
        
    }
}
module.exports = {connectDb}