const mongoose = require('mongoose');
// require("dotenv").config()

const connectDatabase = async ()=>{

    try {
        // const databaseConfig = "mongodb://127.0.0.1/ECommerce";       
        const URL = `mongodb+srv://hoangvu1872k2:dGLxWXOI9SfmbBBe@cluster0.8v4gmeb.mongodb.net/?retryWrites=true&w=majority`
        const connect = await mongoose.connect(databaseConfig);
        // const connect = await mongoose.connect(URL);
        console.log(`da ket noi mongodb: ${connect.connection.host}`);
    } catch (error) {
        console.log('chua the ket noi toi mongodb');
        console.log(error);
    }
}

module.exports = connectDatabase;