const mongoose = require('mongoose');

const connectdb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Mongo DB connected: ${conn.connection.host}`);
};

module.exports = connectdb;
