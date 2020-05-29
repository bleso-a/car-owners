const mongoose = require('mongoose'); // Connect to mongodb

const csv=require('csvtojson')
require('dotenv').config();
const CarOwner = require('./models/car_owners.model');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    csv()
        .fromFile('./car_ownsers_data.csv')
        .then((jsonObj)=>{
            CarOwner.insertMany(jsonObj).then((obj)=> {
                console.log("MongoDB database seeded successfully");
                process.exit();
            }) 
        })
  console.log("MongoDB database connection established successfully");
})