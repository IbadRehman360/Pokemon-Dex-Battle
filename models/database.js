const mongoose = require('mongoose');

async function mongooseConnection(dbUrl) {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
}

module.exports = mongooseConnection;
