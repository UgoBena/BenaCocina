var express = require('express');
var Recipe = require('../models/Recipe');
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
/*const test = new Recipe({ 
  name: 'Miam miam',
  overview: "on va se régaleeer",
  prep_time: "20min",
  cook_time:"30min",
  dish_type:"maindish",
  categories:["méditerranéen","asiatique"],
  ingredients:[{
    quantity:40,
    unit:"g",
    name:"beurre"
    },
    {
      quantity:1,
      unit:"cuillere à soupe",
      name:"sel"
    }
  ],
  steps:[{
      description:"touillez le sel et la farine ensemble.",
    },
    {
      description:"maintenant dégustez en photo.",
      image:"/blabla"
    }
  ],
  comments:["vraiment on se régale", "NRV"]
});*/

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
  res.send("hello");
  })

router.post('/uploadStepPhoto', upload.single('step_image'), (req, res) => {
    console.log(req);
    var img = fs.readFileSync(req.file.path);
    var data = req.body;
   var encode_image = img.toString('base64');
   // Define a JSONobject for the image attributes for saving to database
   var finalImg = {
        contentType: req.file.mimetype,
        image:  new Buffer(encode_image, 'base64')
     };
   Recipe.findOne({name:data.recipeName},function(err,recipe){
    if (err) res.send(err);
    let newSteps = [...recipe.steps];
    newSteps[data.step] = finalImg;
    Recipe.update({name:data.recipeName},{steps:newSteps});
    res.send("step image added");
   })
  })


/* Get main_image from name */
router.get('/photo/:name', (req, res) => {
  var recipeName = req.params.name;
   
  Recipe.findOne({'name': recipeName }, (err, result) => {
      if (err) return console.log(err)

      if (result){
        res.contentType('image/jpeg');
        res.send(result.main_image.image.buffer);
      }

      else{
        res.send("no such recipe")
      }
    })
})


/* Get step image from name and step index */

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
