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

const corsOptions = {
  // origin: 'http://localhost:5173',
  // origin: 'http://192.168.1.5:5173',
  origin: [
    'http://localhost:5173',
    'http://192.168.1.20:5173'
  ],
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

app.get('/user/login', (req, res) => {
  res.send("🧪 Hardcoded route hit!");
});


app.get('/', (req, res) => {
  res.send('Hello World ....!');
}); 

app.use('/user', userRoutes);
app.use('/captain', captainRoutes);

module.exports = app;