const mongoose = require('mongoose')
require('dotenv').config();
require('colors');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Data base on line'.blue);

    } catch (error) {
        //console.log(error.message.red);
        throw new Error('Error, traing of start db', error)
    }
}
module.exports = {
    dbConnection
}