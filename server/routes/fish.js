// code adapted from lecture content

// imports required packages
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// imports Fish model
let Fish = require('../models/fish');

// get --> extract and read
// post --> post something
// put --> edit/update data
// delete --> delete the data


// get route for the read fish list - read operation
router.get('/', async (req, res, next) => {
  try {
    // fetches documents from Fish mongodb collection
    const FishList = await Fish.find();

    // renders my list page and passes the data to the ejs view
    res.render('Fishs/list', {
      title: 'Fish',
      FishList: FishList
    })

    // error message if database query fails
  } catch (err) {
    console.error(err);
    res.render('Fishs/list',{
      error:'Error on server'
    });
  }
});

// get route for displaying add page- create operation
router.get('/add',async(req,res,next)=>{
  try{
    // renders empty add page
    res.render('Fishs/add',{
      title:'Add Fish'
    });
  }
  catch (err) 
  {
    console.error(err);
    res.render('Fishs/list',{
      error:'Error on server'
    });
  }
});

// post route for processing add page- create operation
router.post('/add',async(req,res,next)=>{
  try{
    // creates new Fish obejct using form fields
    let newFish = Fish({
      fishName: req.body.fishName,
      location: req.body.location,
      bait: req.body.bait,
      time: req.body.time,
      caught: req.body.caught === "true",
    });
    // saves new entry to database
    Fish.create(newFish).then(()=>{
      // redirects to fish list after submitting
      res.redirect('/fishs')
    });
   
  }
  catch (err) 
  {
    console.error(err);
    res.render('Fishs/list',{
      error:'Error on server'
    });
  }
});
// get route for displaying edit page- update operation
router.get('/edit/:id',async(req,res,next)=>{
  try
  {
    // extracts fish ID and retrieves existing fish doc
    const id = req.params.id;
    const fishToEdit = await Fish.findById(id);
    // render edit form with current values filled in 
    res.render("Fishs/edit", {
        title: 'Edit Fish',
        Fish: fishToEdit
      });
  }
  catch(err)
  {
    console.log(err);
    next(err);
  }
});

// post route for processing edit page- update operation
router.post('/edit/:id',async(req,res,next)=>{
  try {
    let id = req.params.id;

    // builds updated fish object with new form values
    let updateFish = Fish({
      _id: id,
      fishName: req.body.fishName,
      location: req.body.location,
      bait: req.body.bait,
      time: req.body.time,
      caught: req.body.caught === "true",
    });

    // updates doc by ID
    Fish.findByIdAndUpdate(id,updateFish).then(()=>{
      res.redirect("/fishs")
    });
  }
  catch(err)
  {
    console.log(err);
    next(err);
  }
});

// get route for performing delete operation- delete operation
router.get('/delete/:id',async(req,res,next)=>{
  try{
    let id = req.params.id;
    // deletes doc with matching ID
    Fish.deleteOne({_id:id}).then(()=>{
      res.redirect("/fishs")
    });

  }
  catch(err)
  {
    console.log(err);
    next(err);
  }
});

// exports router for server.js
module.exports = router;