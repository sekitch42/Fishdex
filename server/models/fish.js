//mongodb schema to model fishdex 
let mongoose = require('mongoose');
let fishModel = new mongoose.Schema({

  fishName: String,
  location: String,
  bait: String,
  time: String,
  caught: Boolean,
},
  {
    collection: "fishs"
  }
);

const Fish = mongoose.model("Fish", fishModel);

module.exports = Fish;