
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Connect to mongodb
require('dotenv').config();

const car_ownersRouter = require('./routes/car_owners');

// create express server
const app = express();
const port = process.env.PORT || 5000;

// Parse Json - Server will send and receive Json
app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})




app.use('/car_owners', car_ownersRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});