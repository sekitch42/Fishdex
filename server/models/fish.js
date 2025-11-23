//mongodb schema to model fishdex 

// imports mongoose
let mongoose = require('mongoose');
let fishModel = new mongoose.Schema({

  // String for typing word entries, boolean for a check box yes/no response
  fishName: String,
  location: String,
  bait: String,
  time: String,
  caught: Boolean,
},
  {
    // the mongodb collection for these documents to go to
    collection: "fishs"
  }
);

// chose Fish as the name of the model to use in routes and controllers
const Fish = mongoose.model("Fish", fishModel);

// exports my model
module.exports = Fish;