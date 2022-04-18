const mongoose = require('mongoose')
require('dotenv').config();
require('colors');

const dbConnection = async () => {
    try {
        console.log('CNN>', process.env.MONGODB_CNN);

        /* await mongoose.connect(process.env.MONGODB_CNN, {
             useNewUrlParser: true,
             useUnifiedTopology: true
         });*/
        console.log('Data base on line'.blue);

    } catch (error) {
        console.log('on CATCH', error.message);
        throw new Error('Error, traing of start db', error.message)
    }
}
module.exports = {
    dbConnection
}