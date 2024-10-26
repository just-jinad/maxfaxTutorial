// import mongoose from 'mongoose'
const  mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async () => {
    mongoose.connect(process.env.MONGODB_URI).then((data)=>{
        console.log("connected", data);
    }).catch((err)=>{
        console.log(err);
    })
}


dbConnect();
