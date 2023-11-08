const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-lite-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


module.exports = mongoose.connection;