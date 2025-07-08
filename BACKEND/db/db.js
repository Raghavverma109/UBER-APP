//connect to the monogoDB database
const mongoose = require('mongoose');
const dotenv = require('dotenv');   
dotenv.config();
const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT  , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
}
module.exports = connectDB;
 