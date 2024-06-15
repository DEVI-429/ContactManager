const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = async () =>{
    try{
        let connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected successfully",connect.connection.host,connect.connection.name)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb;