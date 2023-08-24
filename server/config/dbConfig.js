const mongoose = require("mongoose");

//connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      //these are just to get rid of warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
