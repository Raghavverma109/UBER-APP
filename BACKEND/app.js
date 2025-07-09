const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
// Connect to the database
connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const userRoutes = require('./routes/user.routes');

app.get('/', (req, res) => {
  res.send('Hello World ....!');
}); 

app.use('/user', userRoutes);

module.exports = app;