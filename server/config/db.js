// localhost mongodb for testing

const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Fishdex", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected ✔");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
