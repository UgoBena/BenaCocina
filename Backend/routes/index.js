var express = require('express');
var Recipe = require('../models/Recipe');
const fs = require("fs");
const path = require('path')
const multer = require("multer");
var router = express.Router();

var storage = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null, path.join(__dirname, '../public/images/'));    
   }, 
   filename: function (req, file, cb) { 
      cb(null , file.originalname);   
   }
});

var upload = multer({ storage: storage })


/* GET ALL recipes. */
router.get('/getRecipes', function(req, res, next) {
  Recipe.find(function(err,recipe){
    if (err) res.send(err);
    res.send(recipe);
  })
});

/* Filter recipes by dish_type */
router.get('/getRecipesByDishType', function(req, res, next) {
  const filter = {dish_type:req.query.dishType};
  Recipe.find(filter,function(err,recipe){
    if (err) res.send(err);
    res.send(recipe);
  })
});

/* Filter recipe by category */
router.post('/getRecipesBycategories', function(req, res, next) {
  const filter = {categories:req.body.categories};
  Recipe.find(filter,function(err,recipe){
    if (err) res.send(err);
    res.send(recipe);
  })
});

/* Get specific recipe by name (unique) */
router.get('/getRecipeByName', function(req, res, next) {
  const filter = {name:req.query.name};
  Recipe.find(filter,function(err,recipe){
    if (err) res.send(err);
    res.send(recipe);
  });
});

/* Get recipies by regexp */
//TODO

/* Add a new recipe */
router.post('/addRecipe',function(req,res,next){
  var data = req.body;
  console.log(data);
  const newRecipe = new Recipe({
    name: data.name,
    overview: data.overview,
    prep_time: data.prep_time,
    cook_time:data.cook_time,
    nb_persons:data.nb_persons,
    dish_type:data.dish_type,
    categories:data.categories,
    ingredients:data.ingredients,
    steps:data.steps,
    comments:data.comments
  });
  newRecipe.save(function(err,recipe){
    if (err) res.send(err);
    res.send(recipe);
  });
});

/* upload photos */
router.post('/uploadMainPhoto', upload.single('main_image'), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var data = req.body;
  var encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database
  var finalImg = {
    contentType:req.file.mimetype,
    image: new Buffer(encode_image, 'base64')
  };
  Recipe.findOne({name:data.recipeName},function(err,recipe){
    if (err) res.send(err);
    //newSteps[1] = finalImg;
    recipe["main_image"]=finalImg;
    //console.log(newSteps);
    recipe.save();
    res.send("main image added");
  });
})

router.post('/uploadStepPhoto', upload.single('step_image'), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var data = req.body;
  var encode_image = img.toString('base64');
  var finalImg = {
    contentType:req.file.mimetype,
    image: new Buffer(encode_image, 'base64')
  };
  Recipe.findOne({name:data.recipeName},function(err,recipe){
    if (err) res.send(err);
    //newSteps[1] = finalImg;
    recipe.steps[data.step]["image"]=finalImg;
    console.log(finalImg.buffer);
    //console.log(newSteps);
    recipe.save();

    res.send("step image added");
  });
})


/* Get main_image from name */
router.get('/mainPhoto/:name', (req, res) => {
  var recipeName = req.params.name;
   
  Recipe.findOne({'name': recipeName }, (err, result) => {
      if (err) return console.log(err)

      if (result){
        res.contentType('image/png');
        res.send(result.main_image.image.buffer);
      }

      else{
        res.send("no such recipe")
      }
    })
})


/* Get step image from name and step index */
router.get('/stepPhoto/:name/:index', (req, res) => {
  var recipeName = req.params.name;
  var index = req.params.index;

  Recipe.findOne({'name': recipeName }, (err, result) => {
      if (err) return console.log(err)
      console.log(result.steps);
      if (result){
        if(index<result.steps.length){
          if (result.steps[index].image !== undefined){
            res.contentType('image/png');
            res.send(result.steps[index].image.image.buffer);
          }
          else{
            res.send("this step has no image");
          }
        }
        else{
          res.send("no such step");
        }
      }

      else{
        res.send("no such recipe")
      }
    })
})

/* Add comment to a recipe */
router.post('/addComment',function(req,res,next){
  var data = req.body;
  if (typeof(data.recipeName) !== "string") res.status(400).send("You must provide a recipeName");
  if (!data.comment || data.comment.length === 0) res.status(400).send("You must provide a comment");
  Recipe.findOne({name:data.recipeName},function(err,recipe){
    if (err) res.send(err);
    Recipe.update({name:data.recipeName},{comments:[...recipe.comments,data.comment]});
    res.send("comment added");
  })
});



module.exports = router;
