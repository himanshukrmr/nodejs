const { default: mongoose, mongo } = require("mongoose");

async function connectMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDB
}

