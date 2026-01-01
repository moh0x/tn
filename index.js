const express = require("express");
const port = 3000;
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())
const db = require('./db/db')
const userRoute = require('./routes/auth_routes')
require('dotenv').config();
app.use('/api/auth/',userRoute)
app.listen(port,async()=>{
    console.log('connected');  
    await db.connectDb()
})




