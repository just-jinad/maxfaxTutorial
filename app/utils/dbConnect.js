// // app/utils/dbConnect.js
// const mongoose = require('mongoose');
// require('dotenv').config();


// const  mongoose = require('mongoose')
// require('dotenv').config()

// const dbConnect = async () => {
//     mongoose.connect(process.env.MONGODB_URI).then((data)=>{
//         console.log("connected", data);
//     }).catch((err)=>{
//         console.log(err);
//     })
// }


// // module.exports = dbConnect;
// export default  dbConnect


import mongoose from 'mongoose';

export async function connect() {
    try{
        mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
       })
    } catch (error) {
        console.log(error);
    }
}

