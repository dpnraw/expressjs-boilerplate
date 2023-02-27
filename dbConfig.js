const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
require('dotenv').config()

const url = process.env.DB_URL

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const dbConnection =  mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


module.exports = dbConnection