const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  name:String,
  overview:String,
  prep_time:String,
  cook_time:String,
  dish_type:String,
  categories:[String],
  ingredients:[{
    quantity:Number,
    unit:String,
    name:String
  }],
  steps:[{
    description:String,
    image:String
  }],
  comments:[String]
})

const Recipe = mongoose.model("Recipe",RecipeSchema);
module.exports = Recipe;