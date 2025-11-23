// code adapted from lecture content

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Fish = require('../models/fish');

// get --> extract and read
// post --> post something
// put --> edit/update data
// delete --> delete the data


// get route for the read fish list - read operation
router.get('/', async (req, res, next) => {
  try {
    const FishList = await Fish.find();

    res.render('Fishs/list', {
      title: 'Fish',
      FishList: FishList
    })

  } catch (err) {
    console.error(err);
    res.render('Fishs/list',{
      error:'Error on server'
    })
  }
})

// get route for displaying add page- create operation
router.get('/add',async(req,res,next)=>{
  try{
    res.render('Fishs/add',{
      title:'Add Fish'
    });
  }
  catch (err) 
  {
    console.error(err);
    res.render('Fishs/list',{
      error:'Error on server'
    })
  }
})
// post route for processing add page- create operation
router.post('/add',async(req,res,next)=>{
  try{
    let newFish = Fish({
      "fishName":req.body.fishName,
      "location":req.body.location,
      "bait":req.body.bait,
      "time":req.body.time,
      "caught":req.body.caught,
    });
    Fish.create(newFish).then(()=>{
      res.redirect('/fishs')
    })
   
  }
  catch (err) 
  {
    console.error(err);
    res.render('Fishs/list',{
      error:'Error on server'
    })
  }
})
// get route for displaying edit page- update operation
router.get('/edit/:id',async(req,res,next)=>{
  try
  {
    const id = req.params.id;
    const fishToEdit = await Fish.findById(id);
    res.render("Fishs/edit",
      {
        title: 'Edit Fish',
        Fish: fishToEdit
      }
    )
  }
  catch(err)
  {
    console.log(err);
    next(err);
  }
})
// post route for processing edit page- update operation
router.post('/edit/:id',async(req,res,next)=>{
  try {
    let id = req.params.id;
    let updateFish = Fish({
      "_id": id,
      "fishName": req.body.fishName,
      "location": req.body.location,
      "bait": req.body.bait,
      "time": req.body.time,
      "caught": req.body.caught,
    })
    Fish.findByIdAndUpdate(id,updateFish).then(()=>{
      res.redirect("/fishs")
    })
  }
  catch(err)
  {
    console.log(err);
    next(err);
  }
})
// get route for performing delete operation- delete operation
router.get('/delete/:id',async(req,res,next)=>{
  try{
    let id = req.params.id;
    Fish.deleteOne({_id:id}).then(()=>{
      res.redirect("/fishs")
    })
  }
  catch(err)
  {
    console.log(err);
    next(err);
  }

});

// exports router for server.js
module.exports = router;