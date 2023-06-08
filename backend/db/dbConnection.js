const mongoose = require("mongoose")
require('dotenv').config();
mongoose.set("strictQuery", false);
const uri = process.env.MONGO_URI;
const connectDb = async () => {
    try{
        // const connect = await mongoose.connect(uri);
        const connect = await mongoose.connect('mongodb+srv://admin:admin@for-learning.3ntz7tf.mongodb.net/mycontacts-backend?retryWrites=true&w=majority');
        
        console.log("Database connected",connect.connection.host,connect.connection.name) 
    }
    catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;