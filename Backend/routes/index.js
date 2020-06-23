var express = require('express');
var Recipe = require('../models/Recipe')
var router = express.Router();


const test = new Recipe({ 
  name: 'Miam miam',
  overview: "on va se régaleeer",
  prep_time: "20min",
  cook_time:"30min",
  dish_type:"starter",
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
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(test);
});

module.exports = router;
