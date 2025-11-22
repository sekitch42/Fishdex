//mongodb schema to model fishdex 
const mongoose = require('mongoose');
const fishSchema = new mongoose.Schema({

  fishName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  bait: {
    type: String,
    trim: true,
  },
  time: {
    type: String,
    trim: true,
  },
  caught: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Fish", fishSchema);
