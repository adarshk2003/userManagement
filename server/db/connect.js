const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function mongoConnect() {
    try {
        console.log("mongo uri", process.env.MOMGODB_URI)
        await mongoose.connect(process.env.MOMGODB_URI);
        console.log("database connection establoshed");
    } catch (error) {
        console.log("database connection error:",error);
    }
}



module.exports = mongoConnect;